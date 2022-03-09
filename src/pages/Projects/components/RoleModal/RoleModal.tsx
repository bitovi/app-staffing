import { useState } from "react";
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
  FormErrorMessage,
  FormLabel,
  Input,
  HStack,
  VStack,
  Flex,
  SimpleGrid,
  Select,
  Text,
  RadioGroup,
  Radio,
  IconButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import ReactSelect, {
  components,
  ControlProps,
  IndicatorProps,
} from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Project,
  Skill,
  Role,
  NewAssignment,
  Employee,
} from "../../../../services/api";
import { AddIcon } from "@chakra-ui/icons";
import parseISO from "date-fns/parseISO";
import range from "lodash/range";
import omit from "lodash/omit";
import isNil from "lodash/isNil";
import { TrashIcon, SearchIcon, UserIcon } from "../../../assets";
import styles from "./RoleModal.module.css";
import { mutate } from "swr";

type NewRole = Partial<Omit<Role, "id">>;

interface RoleModalProps {
  createRole: (
    data: NewRole,
    identifier: string,
  ) => Promise<string | undefined>;
  createAssignment: (
    data: NewAssignment,
    identifier: string | undefined,
  ) => Promise<string | undefined>;
  onClose: () => void;
  isOpen: boolean;
  skills: Skill[];
  employees: Employee[];
  project?: Project;
}

interface RoleFormData {
  skillId: string;
  startDate: string;
  startConfidence?: number;
  endDate: string;
  endConfidence?: number | null;
  assignments?: AssignmentFormData[];
}

type SaveButtonStatus = "idle" | "pending";

interface AssignmentFormData {
  employeeId?: string;
  startDate: string;
  endDate?: string;
}

export default function RoleModal({
  createRole,
  createAssignment,
  onClose,
  isOpen,
  skills,
  employees,
  project,
}: RoleModalProps): JSX.Element {
  const [serverError, setServerError] = useState(false);
  const [status, setStatus] = useState<SaveButtonStatus>("idle");

  const initialValues = {
    startDate: "",
    startConfidence: 1,
    endDate: "",
    endConfidence: null,
    skillId: "",
    assignments: [],
  };

  const {
    register,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RoleFormData>({
    shouldUnregister: true,
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "assignments",
  });

  const roleStartDate = watch("startDate");
  const roleStartConfidence = watch("startConfidence");
  const canSubmitForm = roleStartDate && roleStartConfidence ? true : false;

  const addTeamMember = () => {
    const newAssignment: AssignmentFormData = {
      employeeId: undefined,
      startDate: "",
      endDate: "",
    };
    append(newAssignment, {
      focusName: `assignments.${fields.length}.employeeId`,
    });
  };

  const removeTeamMember = (index: number) => {
    remove(index);
  };

  const sanitizeAssignments = (
    assignments?: AssignmentFormData[],
  ): NewAssignment[] | undefined => {
    if (assignments) {
      return assignments.map((assignment) => ({
        startDate: assignment.startDate
          ? parseISO(assignment.startDate)
          : undefined,
        endDate: assignment.endDate ? parseISO(assignment.endDate) : undefined,
        employee: employees.find(
          (employee) => employee.id === assignment.employeeId,
        ),
      }));
    }
    return;
  };

  const resetForm = () => {
    setTimeout(() => reset(initialValues));
  };

  const handleClose = async () => {
    await resetForm();
    onClose();
  };

  const addAssignmentsToRole = async (
    assignments: NewAssignment[],
    roleId: Role,
  ) => {
    for (const assignment of assignments) {
      if (assignment.employee && assignment.startDate) {
        await createAssignment(
          {
            ...assignment,
            role: roleId,
          },
          assignment.employee?.name,
        );
      }
    }
    mutate(`/projects/${project?.id}`);
  };

  const submitForm = async (data: RoleFormData) => {
    try {
      setStatus("pending");
      if (project) {
        const newRole = {
          project: omit(project, ["roles"]),
          skills: skills.filter((skill) => skill.id === data.skillId),
          startDate: parseISO(data.startDate),
          startConfidence: data.startConfidence || 1,
          endDate: data.endDate ? parseISO(data.endDate) : undefined,
          ...(isNil(data.endConfidence)
            ? null
            : { endConfidence: data.endConfidence }),
        };
        const newRoleId = await createRole(
          newRole,
          skills.filter((skill) => skill.id === data.skillId)?.[0]?.name,
        );

        const assignments = sanitizeAssignments(data.assignments);
        if (assignments?.length && Array.isArray(assignments) && newRoleId) {
          await addAssignmentsToRole(assignments, {
            ...newRole,
            id: newRoleId,
          });
        }
      }

      setStatus("idle");
      handleClose();
    } catch (e) {
      setServerError(!serverError);
    }
  };

  const assignmentsOptions = employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
  }));

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textStyle="modal.title" pt={6} pl={6}>
          Add a New Role
        </ModalHeader>
        <ModalCloseButton mt={2} />
        <ModalBody pt={4}>
          <VStack spacing="30px" pb={6}>
            <FormControl>
              <FormLabel>Select Role</FormLabel>
              <Controller
                control={control}
                name="skillId"
                render={({ field }) => (
                  <RadioGroup
                    name="skillId"
                    onChange={field.onChange}
                    value={field.value}
                  >
                    <SimpleGrid columns={3} spacingY={2}>
                      {skills.map((skill) => (
                        <Radio
                          key={skill.id}
                          value={skill.id}
                          aria-describedby={skill.id}
                        >
                          {skill.name}
                        </Radio>
                      ))}
                    </SimpleGrid>
                  </RadioGroup>
                )}
              />
            </FormControl>

            <HStack spacing="8px" width="100%" align="flex-start">
              <FormControl
                isRequired
                isInvalid={errors.startDate ? true : false}
              >
                <FormLabel>Start Date</FormLabel>
                <Input
                  {...register("startDate", {
                    required: "Date is required",
                  })}
                  id="role_start_date"
                  type="date"
                  data-testid="startDateInput"
                  name="startDate"
                />
                <FormErrorMessage fontSize="small">
                  {errors?.startDate?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={errors.startConfidence ? true : false}
              >
                <FormLabel htmlFor="role_start_confidence">
                  Confidence
                </FormLabel>
                <Select
                  {...register("startConfidence", {
                    required: "Confidence is required",
                  })}
                  aria-label="Start Date Confidence"
                  id="role_start_confidence"
                  name="startConfidence"
                >
                  {makeConfidenceOptions()}
                </Select>

                <FormErrorMessage fontSize="small">
                  {errors?.startConfidence?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="role_end_date">End Date</FormLabel>
                <Input
                  {...register("endDate")}
                  id="role_end_date"
                  type="date"
                  data-testid="endDateInput"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="role_end_confidence">Confidence</FormLabel>
                <Select
                  {...register("endConfidence")}
                  placeholder=" "
                  id="role_end_confidence"
                  aria-label="End Date Confidence"
                >
                  {makeConfidenceOptions()}
                </Select>
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Team Members</FormLabel>
              <Flex
                width="100%"
                flexDirection="row"
                boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
                padding="1em 0.8em"
                backgroundColor="#F7F7F7"
                border="1px solid #eee"
                borderRadius="4px"
                fontSize="14px"
                alignItems="center"
              >
                {fields?.length ? (
                  <VStack
                    backgroundColor="#FFFFFF"
                    padding="1.4em 1.15em 0.4em 1.15em"
                    width="100%"
                  >
                    {fields.map((teamMember, index) => (
                      <Flex
                        key={teamMember.id}
                        alignItems="center"
                        justifyContent="space-between"
                        gap="8px"
                        marginBottom="1em !important"
                        width="100%"
                        data-testid="team-member-row"
                      >
                        <FormControl width="40%">
                          {index < 1 ? (
                            <FormLabel id="employee-name">
                              Employee Name
                            </FormLabel>
                          ) : null}
                          <Controller
                            control={control}
                            name={`assignments.${index}.employeeId` as const}
                            render={({ field }) => (
                              <ReactSelect
                                ref={field.ref}
                                aria-labelledby="employee-name"
                                options={assignmentsOptions}
                                value={assignmentsOptions.find(
                                  (c) => c.value === field.value,
                                )}
                                onChange={(val) => field.onChange(val?.value)}
                                className={styles.assignmentSelect}
                                classNamePrefix={styles.assignmentSelect}
                                placeholder="Assign Employee"
                                blurInputOnSelect
                                components={{
                                  IndicatorSeparator: null,
                                  DropdownIndicator: (props) => (
                                    <DropdownIndicator {...props} />
                                  ),
                                  Control: (props) => <Control {...props} />,
                                }}
                                theme={(theme) => ({
                                  ...theme,
                                  colors: {
                                    ...theme.colors,
                                    primary: "#319795",
                                    primary75: "#4BB1AF",
                                    primary50: "#64CAC8",
                                    primary25: "#7EE4E2",
                                  },
                                })}
                              />
                            )}
                          />
                        </FormControl>
                        <FormControl width="28%">
                          {index < 1 ? <FormLabel>Start Date</FormLabel> : null}
                          <Input
                            {...register(
                              `assignments.${index}.startDate` as const,
                            )}
                            id={`assignment${index}_start_date`}
                            type="date"
                            data-testid={`assignment${index}_startDateInput`}
                          />
                        </FormControl>
                        <FormControl width="28%">
                          {index < 1 ? <FormLabel>End Date</FormLabel> : null}
                          <Input
                            {...register(
                              `assignments.${index}.endDate` as const,
                            )}
                            id={`assignment${index}_end_date`}
                            type="date"
                            data-testid={`assignment${index}_endDateInput`}
                          />
                        </FormControl>
                        <IconButton
                          variant="deleteAction"
                          aria-label="Remove Team Member"
                          fontSize="15px"
                          size="sm"
                          alignSelf="flex-end"
                          marginBottom="4px"
                          icon={<TrashIcon fill="currentColor" />}
                          onClick={() => removeTeamMember(index)}
                          data-testid="remove-team-member"
                        />
                      </Flex>
                    ))}
                  </VStack>
                ) : (
                  <Flex alignItems="center" padding="0.5em 1em">
                    <Image
                      height="77px"
                      width="64px"
                      src="/assets/images/folderWithFile.png"
                      alt="Folder With File"
                      opacity="60%"
                    />
                    <Text
                      fontSize="14px"
                      fontFamily="Montserrat"
                      marginLeft="0.5em"
                    >
                      There are currently no team members assigned to <br />{" "}
                      this project, Add some.
                    </Text>
                  </Flex>
                )}
              </Flex>
            </FormControl>
          </VStack>
          <FormControl>
            <Flex
              alignItems="center"
              flexDirection="row"
              cursor="pointer"
              _hover={{ color: "#2C7A7B" }}
              width="fit-content"
              onClick={addTeamMember}
              data-testid="add-team-member"
            >
              <AddIcon />
              <Text ml={2}>Add Team Member to this Role</Text>
            </Flex>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr="8px" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            {...getSubmitButtonProps({
              status,
              canSubmitForm,
              onClick: handleSubmit((data) => submitForm(data)),
            })}
            aria-disabled={!canSubmitForm}
          >
            Save &amp; Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function getSubmitButtonProps({
  status,
  canSubmitForm,
  onClick,
}: {
  status: SaveButtonStatus;
  canSubmitForm: boolean;
  onClick: () => Promise<void>;
}) {
  if (status === "pending") {
    return {
      isLoading: true,
      isDisabled: true,
      loadingText: "Adding New Role",
    };
  }

  return {
    isLoading: false,
    isDisabled: false,
    variant: canSubmitForm ? "primary" : "primaryDisabled",
    onClick,
  };
}

function makeConfidenceOptions() {
  return range(11)
    .map((i) => i / 10)
    .map((num, index) => (
      <option value={num} key={index}>
        {num * 100}%
      </option>
    ));
}

type option = {
  label: string;
  value: string;
};

const DropdownIndicator = (props: IndicatorProps<option, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIcon />
    </components.DropdownIndicator>
  );
};

const Control = (props: ControlProps<option, false>) => {
  return (
    <components.Control {...props}>
      <UserIcon />
      {props.children}
    </components.Control>
  );
};
