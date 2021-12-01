import { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  VStack,
  Checkbox,
  Flex,
  FormErrorMessage,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { useForm, Controller } from "react-hook-form";
import { isEmpty, pickBy } from "lodash";
import format from "date-fns/format";

import { Employee, Skill } from "../../../../services/api";
import { EmployeeJSON } from "../../../../services/api/employees/interfaces";
import { ServiceError } from "../../../../components/ServiceError";

interface EmployeeFormData {
  name: string;
  start_date: string;
  end_date: string;
  roles?: Record<string, boolean>;
}

interface EmployeeModalProps {
  onSave: (employee: {
    data: Omit<EmployeeJSON, "id">;
    id?: string;
  }) => Promise<string | void>;
  onClose: () => void;
  isOpen: boolean;
  skills?: Skill[];
  employee?: Employee;
}

export default function EmployeeModal({
  onSave,
  onClose,
  isOpen,
  skills,
  employee,
}: EmployeeModalProps): JSX.Element {
  const [serverError, setServerError] = useState(false);
  const employeeData = employee ? toEmployeeFormData(employee) : undefined;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isDirty: formIsDirty },
  } = useForm<EmployeeFormData>({
    defaultValues: employeeData,
  });

  const isNewEmployee = isEmpty(employeeData);
  const selectedRolesMap = watch("roles");
  const selectedRoles = getSelectedRoles(selectedRolesMap);

  // allow form submit if at least one role is selected for a new employee OR
  // any of the inputs has been modified when editing an existing employee
  const canSubmitForm =
    (isNewEmployee && !isEmpty(selectedRoles)) ||
    (!isNewEmployee && formIsDirty);

  const submitForm = async (data: EmployeeFormData) => {
    try {
      // added the Employee ID property for PATCH request as specified in JSON API PATCH specs
      await onSave({
        data: formatEmployeeData(data),
        id: employee ? employee.id : undefined,
      });
      reset();
      onClose();
    } catch (e) {
      setServerError(!serverError);
    }
  };

  useEffect(() => {
    if (employee) {
      reset(toEmployeeFormData(employee));
    }
  }, [employee, reset]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent mt="14vh">
        <ModalHeader>
          {isNewEmployee ? "Add a New Team Member" : "Edit Team Member"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="16px">
            <FormControl isRequired isInvalid={errors.name ? true : false}>
              <FormLabel>Full name</FormLabel>
              <Input
                {...register("name", {
                  required: "Name not filled out",
                  validate: (name) =>
                    name.split(" ").length >= 2 || "Full name required",
                })}
                id="name"
                placeholder="name"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>

            <HStack spacing="8px" width="100%">
              <FormControl
                isRequired
                isInvalid={errors.start_date ? true : false}
              >
                <FormLabel>Start Date</FormLabel>
                <Input
                  {...register("start_date", {
                    required: true,
                  })}
                  id="start_date"
                  type="date"
                  data-testid="start_date"
                />
              </FormControl>

              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input {...register("end_date")} id="end_date" type="date" />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Roles</FormLabel>
              <Flex mt={4} mb={11} flexGrow={1}>
                <SimpleGrid columns={2}>
                  {skills?.map((skill) => (
                    <Controller
                      key={skill.id}
                      control={control}
                      name={`roles.${skill.id}`}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          value={skill.id}
                          onChange={onChange}
                          onBlur={onBlur}
                          isChecked={value}
                        >
                          {skill.name}
                        </Checkbox>
                      )}
                    />
                  ))}
                </SimpleGrid>
              </Flex>
            </FormControl>
          </VStack>
        </ModalBody>

        {serverError && (
          <Flex justifyContent="center" width="100%">
            <ServiceError
              mt="40px"
              mb="25px"
              bg="red.100"
              color="gray.700"
              iconColor="red.500"
              textStyle="table.title"
              name="Server Error"
              width="80%"
              h="48px"
            >
              <Box
                as="button"
                onClick={() => setServerError(!serverError)}
                position="absolute"
                top="11.75px"
                right="11.75px"
                color="gray.700"
              >
                <CloseIcon w="8.50px" h="8.50px" />
              </Box>
            </ServiceError>
          </Flex>
        )}

        <ModalFooter>
          <Button variant="outline" mr="8px" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={canSubmitForm ? "primary" : "primaryDisabled"}
            isDisabled={!canSubmitForm}
            onClick={handleSubmit((data) => submitForm(data))}
          >
            {isNewEmployee ? "Add & Close" : "Save & Close"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function getSelectedRoles(map: undefined | Record<string, boolean>) {
  return isEmpty(map) ? [] : Object.keys(pickBy(map, (checked) => !!checked));
}

function formatEmployeeData(data: EmployeeFormData): Omit<EmployeeJSON, "id"> {
  const selectedRoles = getSelectedRoles(data.roles);

  return {
    type: "employees",
    attributes: {
      name: data.name,
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
    },
    relationships: {
      skills: {
        data: selectedRoles.map((role) => ({
          type: "skills",
          id: role,
        })),
      },
    },
  };
}

function toEmployeeFormData(data: Employee): EmployeeFormData {
  const roles: Record<string, boolean> = {};

  data.skills.forEach((skill) => {
    roles[skill.id] = true;
  });

  return {
    name: data.name,
    start_date: format(data.startDate, "yyyy-MM-dd"),
    end_date: data.endDate ? format(data.endDate, "yyyy-MM-dd") : "",
    roles,
  };
}
