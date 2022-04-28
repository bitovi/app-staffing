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
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { useForm, Controller } from "react-hook-form";
import { isEmpty, pickBy } from "lodash";
import formatISO from "date-fns/formatISO";
import parseISO from "date-fns/parseISO";

import { Employee, Skill } from "../../../../services/api";
import { ServiceError } from "../../../../components/ServiceError";

interface EmployeeFormData {
  name: string;
  startDate: string;
  endDate: string;
  skills: Record<string, boolean>;
}
interface EmployeeModalProps {
  onSave: (data: Omit<Employee, "id">) => Promise<void>;
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

  const startDateInput: HTMLInputElement = document.getElementById(
    "start_date",
  ) as HTMLInputElement;
  const isStartDateInvalid = !!startDateInput?.validity.badInput;
  const startDateValidationMessage = startDateInput?.validationMessage;

  const endDateInput: HTMLInputElement = document.getElementById(
    "end_date",
  ) as HTMLInputElement;
  const isEndDateInvalid = !!endDateInput?.validity.badInput;
  const endDateValidationMessage = endDateInput?.validationMessage;

  const isNewEmployee = isEmpty(employeeData);
  const employeeName = watch("name");

  const canSubmitForm =
    !isStartDateInvalid &&
    !isEndDateInvalid &&
    ((isNewEmployee && nameProvided(employeeName)) ||
      (!isNewEmployee && formIsDirty && nameProvided(employeeName)));

  const submitForm = async (data: EmployeeFormData) => {
    if (canSubmitForm) {
      const employeeSkills = getSelectedSkills(data.skills, skills || []);

      try {
        setStatus("pending");
        await onSave({
          name: data.name,
          startDate: data.startDate ? parseISO(data.startDate) : null,
          endDate: data.endDate ? parseISO(data.endDate) : null,
          skills: employeeSkills,
        });
        reset({ name: "", startDate: "", endDate: "" });
        onClose();
        setStatus("idle");
      } catch (e) {
        setServerError(!serverError);
      }
    }
  };

  const resetForm = () => {
    reset(
      employee
        ? toEmployeeFormData(employee)
        : {
            name: "",
            startDate: "",
            endDate: "",
          },
    );
  };

  // Reset the form fields if the `employee` prop changes while the modal is
  // mounted
  useEffect(resetForm, [employee, reset]);

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
                    nameProvided(name) || "Full name required",
                })}
                id="name"
                placeholder="name"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>

            <HStack spacing="8px" width="100%" alignItems="baseline">
              <FormControl
                isInvalid={
                  errors.startDate || isStartDateInvalid ? true : false
                }
              >
                <FormLabel>Start Date</FormLabel>
                <Input
                  {...register("startDate")}
                  id="start_date"
                  type="date"
                  data-testid="start_date"
                  min="2000-01-01"
                  max="2200-01-01"
                />
                {startDateValidationMessage && (
                  <Text
                    display="flex"
                    alignItems="center"
                    marginTop="0.5rem"
                    fontSize="0.875rem"
                    color="#E53E3E"
                  >
                    {startDateValidationMessage}
                  </Text>
                )}
              </FormControl>

              <FormControl
                isInvalid={errors.endDate || isEndDateInvalid ? true : false}
              >
                <FormLabel>End Date</FormLabel>
                <Input
                  {...register("endDate")}
                  id="end_date"
                  type="date"
                  min="2000-01-01"
                  max="2200-01-01"
                />
                {endDateValidationMessage && (
                  <Text
                    display="flex"
                    alignItems="center"
                    marginTop="0.5rem"
                    fontSize="0.875rem"
                    color="#E53E3E"
                  >
                    {endDateValidationMessage}
                  </Text>
                )}
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
                      name={`skills.${skill.id}`}
                      render={({ field: { onChange, onBlur, value } }) => {
                        return (
                          <Checkbox
                            value={skill.id}
                            onChange={onChange}
                            onBlur={onBlur}
                            isChecked={Boolean(value)}
                            textStyle="modal.checkboxLabel"
                          >
                            {skill.name}
                          </Checkbox>
                        );
                      }}
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
          <Button
            variant="outline"
            mr="8px"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            {...getSubmitButtonProps({
              status,
              canSubmitForm,
              isNewEmployee,
              onClick: handleSubmit((data) => submitForm(data)),
            })}
            aria-disabled={!canSubmitForm}
          >
            {isNewEmployee ? "Add & Close" : "Save & Close"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function nameProvided(name: string) {
  return name ? name.trim().length >= 1 : false;
}

function getSubmitButtonProps({
  status,
  canSubmitForm,
  isNewEmployee,
  onClick,
}: {
  status: SaveButtonStatus;
  canSubmitForm: boolean;
  isNewEmployee: boolean;
  onClick: () => Promise<void>;
}) {
  if (status === "pending" && !isNewEmployee) {
    return {
      isLoading: true,
      isDisabled: true,
      loadingText: "Editing team member",
    };
  } else if (status === "pending" && isNewEmployee) {
    return {
      isLoading: true,
      isDisabled: true,
      loadingText: "Adding team member",
    };
  }

  return {
    variant: canSubmitForm ? "primary" : "primaryDisabled",
    onClick,
  };
}

/**
 * Retrieve the selected skills from the object bound to the Employee form
 */
function getSelectedSkills(roles: Record<string, boolean>, skills: Skill[]) {
  if (isEmpty(roles)) return [];

  const selected = pickBy(roles, (checked) => !!checked);
  return Object.keys(selected).map(
    (entry: string) => skills.find((skill) => skill.id === entry) as Skill,
  );
}

function toEmployeeFormData(data: Employee): EmployeeFormData {
  const skills: Record<string, boolean> = {};

  data?.skills?.forEach(({ id }) => {
    skills[id] = true;
  });

  return {
    name: data.name,
    startDate: data.startDate
      ? formatISO(data.startDate, { representation: "date" })
      : "",
    endDate: data.endDate
      ? formatISO(data.endDate, { representation: "date" })
      : "",
    skills,
  };
}
