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
  Divider,
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
  onSave: (data: Omit<EmployeeJSON, "id">) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
  skills?: Skill[];
  employee?: Employee;
}

type SaveButtonStatus = "idle" | "pending";

export default function EmployeeModal({
  onSave,
  onClose,
  isOpen,
  skills,
  employee,
}: EmployeeModalProps): JSX.Element {
  const [serverError, setServerError] = useState(false);
  const [status, setStatus] = useState<SaveButtonStatus>("idle");
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
  const employeeName = watch("name");

  const fullNameProvided = (name: string): boolean =>
    name ? name.trim().split(" ").length >= 2 : false;

  const canSubmitForm =
    (isNewEmployee && fullNameProvided(employeeName)) ||
    (!isNewEmployee && formIsDirty && fullNameProvided(employeeName));

  const submitForm = async (data: EmployeeFormData) => {
    try {
      await setStatus("pending");
      await onSave(formatEmployeeData(data));
      reset({
        name: "",
        start_date: "",
        end_date: "",
      });
      onClose();
      setStatus("idle");
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
    <Modal isOpen={isOpen} onClose={onClose} size="md" variant="team_modal">
      <ModalOverlay />
      <ModalContent mt="14vh">
        <ModalHeader textStyle="modal.title" pt={6} pl={6}>
          {isNewEmployee ? "Add a New Team Member" : "Edit Team Member"}
        </ModalHeader>
        <ModalCloseButton mt={2} />
        <Divider pt={2} />
        <ModalBody pt={4}>
          <VStack spacing="16px" pb={6}>
            <FormControl isRequired isInvalid={errors.name ? true : false}>
              <FormLabel>Full Name</FormLabel>
              <Input
                {...register("name", {
                  required: "Name not filled out",
                  validate: (name) =>
                    name.trim().split(" ").length >= 2 || "Full name required",
                })}
                id="name"
                placeholder="name"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>

            <HStack spacing="8px" width="100%">
              <FormControl isInvalid={errors.start_date ? true : false}>
                <FormLabel>Start Date</FormLabel>
                <Input
                  {...register("start_date")}
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

            <FormControl>
              <FormLabel>Roles</FormLabel>
              <Flex mt={4} flexGrow={1}>
                <SimpleGrid columns={2} spacingX={24} spacingY={4}>
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
                          textStyle="modal.checkboxLabel"
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
        <Divider pt={1} />

        <ModalFooter>
          <Button variant="outline" mr="8px" onClick={onClose}>
            Cancel
          </Button>
          {status === "idle" ? (
            <Button
              variant={canSubmitForm ? "primary" : "primaryDisabled"}
              isDisabled={!canSubmitForm}
              onClick={handleSubmit((data) => submitForm(data))}
            >
              {isNewEmployee ? "Add & Close" : "Save & Close"}
            </Button>
          ) : (
            <Button isLoading loadingText="Saving" isDisabled />
          )}
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
      startDate: data.start_date,
      endDate: data.end_date,
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
    start_date: data.startDate ? format(data.startDate, "yyyy-MM-dd") : "",
    end_date: data.endDate ? format(data.endDate, "yyyy-MM-dd") : "",
    roles,
  };
}
