import { Suspense, useState, useEffect } from "react";
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
  Box,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { useForm } from "react-hook-form";
import { isEmpty, pickBy } from "lodash";
import formatISO from "date-fns/formatISO";

import { formatDateToUTC } from "../../../../services/helpers/utcdate";
import { Employee, Skill } from "../../../../services/api";
import { ServiceError } from "../../../../components/ServiceError";
import EmployeeModalSkillsCard from "./components/EmployeeModalSkillsCard";

export interface EmployeeFormData {
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
  employee,
}: EmployeeModalProps): JSX.Element {
  const [serverError, setServerError] = useState(false);
  const [status, setStatus] = useState<SaveButtonStatus>("idle");
  const employeeData = employee ? toEmployeeFormData(employee) : undefined;
  const [skills, setSkills] = useState<Skill[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors, isDirty: formIsDirty },
  } = useForm<EmployeeFormData>({
    defaultValues: employeeData,
  });

  // When we type in the date's input text field, react does not detect changes
  // and if the date is invalid the value is just a string.
  // That's why we check the input element manually to verify it's valid
  const startDateInput: HTMLInputElement = document.getElementById(
    "start_date",
  ) as HTMLInputElement;
  const isStartDateInvalid = !!startDateInput?.validity.badInput;
  const startDateValidationMessage = startDateInput?.validationMessage;

  // Sometimes the input's validity does not update
  // so we have this extra check in the onblur event
  if (startDateInput) {
    startDateInput.onblur = () => {
      if (startDateInput.validity.badInput) {
        setError("startDate", {
          type: "custom",
          message: startDateValidationMessage,
        });
      } else {
        clearErrors("startDate");
      }
    };
  }

  const endDateInput: HTMLInputElement = document.getElementById(
    "end_date",
  ) as HTMLInputElement;
  const isEndDateInvalid = !!endDateInput?.validity.badInput;
  const endDateValidationMessage = endDateInput?.validationMessage;

  if (endDateInput) {
    endDateInput.onblur = () => {
      if (endDateInput.validity.badInput) {
        setError("endDate", {
          type: "custom",
          message: endDateValidationMessage,
        });
      } else {
        clearErrors("endDate");
      }
    };
  }

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
          startDate: data.startDate ? data.startDate : null,
          endDate: data.endDate ? data.endDate : null,
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
      <ModalContent margin="auto" alignSelf="center">
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
                {isStartDateInvalid && startDateValidationMessage && (
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
                {isEndDateInvalid && endDateValidationMessage && (
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
              <FormLabel htmlFor="">Skills</FormLabel>
              <Suspense
                fallback={
                  <Center w="100%" h="100%">
                    <Spinner />
                  </Center>
                }
              >
                <EmployeeModalSkillsCard
                  control={control}
                  setSkills={setSkills}
                  skills={skills}
                />
              </Suspense>
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
      ? formatISO(formatDateToUTC(data.startDate), { representation: "date" })
      : "",
    endDate: data.endDate
      ? formatISO(formatDateToUTC(data.endDate), { representation: "date" })
      : "",
    skills,
  };
}
