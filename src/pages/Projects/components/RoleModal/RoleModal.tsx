import { useEffect, useState } from "react";
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
  Heading,
  Box,
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
  Assignment,
} from "../../../../services/api";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import parseISO from "date-fns/parseISO";
import { formatDateToUTC } from "../../../../services/helpers/utcdate";
import formatISO from "date-fns/formatISO";
import range from "lodash/range";
import omit from "lodash/omit";
import { TrashIcon, SearchIcon, UserIcon } from "../../../assets";
import styles from "./RoleModal.module.scss";
import { mutate } from "swr";
import { ServiceError } from "../../../../components/ServiceError";

type NewRole = Partial<Omit<Role, "id">>;

interface RoleModalProps {
  createRole: (
    data: NewRole,
    identifier: string,
    updateParentCache?: boolean,
  ) => Promise<string | undefined>;
  createAssignment: (
    data: NewAssignment,
    identifier: string | undefined,
  ) => Promise<string | undefined>;
  updateRole: (
    id: string,
    data: Partial<Role>,
    identifier: string,
    undefinedValues: string[],
    updateParentCache?: boolean,
  ) => Promise<void>;
  updateAssignment: (
    id: string,
    data: Partial<Assignment>,
    identifier?: string,
  ) => Promise<void>;
  destroyAssignment: (
    id: string,
    parentId?: string,
    identifier?: string,
  ) => void;
  onClose: () => void;
  isOpen: boolean;
  skills: Skill[];
  employees: Employee[];
  project?: Project;
  roleToEdit?: Role;
  setRoleToEdit?: (role: Role | undefined) => void;
}

interface RoleFormData {
  skillId: string;
  startDate: string;
  startConfidence?: number;
  endDate: string;
  endConfidence?: number | string;
  assignments?: AssignmentFormData[];
}

type SaveButtonStatus = "idle" | "pending";

interface AssignmentFormData {
  assignmentId?: string;
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
  roleToEdit,
  setRoleToEdit,
  updateRole,
  updateAssignment,
  destroyAssignment,
}: RoleModalProps): JSX.Element {
  const [serverError, setServerError] = useState(false);
  const [status, setStatus] = useState<SaveButtonStatus>("idle");

  const initialValues = {
    startDate: "",
    startConfidence: 1,
    endDate: "",
    endConfidence: "",
    skillId: "",
    assignments: [],
  };

  const formatDate = (date: Date | string) => {
    return formatISO(formatDateToUTC(date)).substring(0, 10);
  };

  const {
    register,
    watch,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isDirty, dirtyFields },
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

  const roleEndDateInput = register("endDate", {
    onChange: (e) => {
      handleEndDateEdgeCases(e.target.value);
    },
  });
  const roleEndDate = watch("endDate");

  const roleEndConfidenceInput = register("endConfidence", {
    onChange: (e) => {
      handleEndConfidenceEdgeCases(e.target.value);
    },
  });
  const roleEndConfidence = watch("endConfidence");

  const roleAssignments = watch("assignments");

  const canSubmitForm = (): boolean => {
    if (roleAssignments) {
      for (const assignment of roleAssignments) {
        if (!assignment.employeeId || !assignment.startDate) {
          return false;
        }
      }
    }
    return !!(roleStartDate && roleStartConfidence && isDirty);
  };

  useEffect(() => {
    function parseAssignmentsInitialValues(assignments: Assignment[]) {
      return assignments.map((assignment) => ({
        assignmentId: assignment.id,
        employeeId: assignment.employee?.id,
        startDate: assignment.startDate ? formatDate(assignment.startDate) : "",
        endDate: assignment.endDate ? formatDate(assignment.endDate) : "",
      }));
    }

    const initialValuesEdit = roleToEdit && {
      startDate: roleToEdit.startDate ? formatDate(roleToEdit.startDate) : "",
      startConfidence: roleToEdit.startConfidence,
      endDate: roleToEdit.endDate ? formatDate(roleToEdit.endDate) : "",
      endConfidence: roleToEdit.endConfidence,
      skillId: undefined,
      assignments: roleToEdit.assignments
        ? parseAssignmentsInitialValues(roleToEdit.assignments)
        : [],
    };

    if (roleToEdit) {
      reset(initialValuesEdit);
    }
  }, [roleToEdit, reset]);

  const handleEndDateEdgeCases = (endDate: string) => {
    if (endDate === "") {
      setValue("endConfidence", "");
    } else if (endDate && !roleEndConfidence) {
      setValue("endConfidence", 1);
    }
  };

  const handleEndConfidenceEdgeCases = (endConfidence: string) => {
    if (endConfidence === "") {
      setValue("endDate", "");
    } else if (endConfidence && !roleEndDate) {
      setValue("endDate", formatDate(new Date()));
    }
  };

  const addTeamMember = () => {
    const newAssignment: AssignmentFormData = {
      assignmentId: "",
      employeeId: "",
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

  const resetForm = () => {
    setTimeout(() => {
      reset(initialValues);
      if (roleToEdit && setRoleToEdit) setRoleToEdit(undefined);
      setServerError(false);
    });
  };

  const handleClose = async () => {
    await resetForm();
    onClose();
  };

  const sanitizeAssignments = (
    assignments?: AssignmentFormData[],
  ): NewAssignment[] | undefined => {
    if (assignments) {
      return assignments.map((assignment) => sanitizeAssignment(assignment));
    }
    return;
  };

  const sanitizeAssignment = (
    assignment: AssignmentFormData,
  ): NewAssignment => {
    return {
      startDate: assignment.startDate
        ? parseISO(assignment.startDate)
        : undefined,
      endDate: assignment.endDate ? parseISO(assignment.endDate) : null,
      employee: employees.find(
        (employee) => employee.id === assignment.employeeId,
      ),
    };
  };

  const compareAssignmentsForEdit = async (
    originalAssignments: Assignment[],
    newData: AssignmentFormData[] | undefined,
    role: Role,
  ) => {
    try {
      const assignmentsToAdd = [];

      if (newData) {
        for (const assignment of newData) {
          // If this role already has assignments, we search for each one to update if needed
          const existingAssignmentIndex = originalAssignments.findIndex(
            (original) => original.id === assignment.assignmentId,
          );
          const existingAssignment =
            originalAssignments[existingAssignmentIndex];

          const newAssignment = sanitizeAssignment(assignment);

          if (existingAssignment) {
            // Assignment exists, we check if it needs to be updated
            if (
              existingAssignment &&
              (newAssignment.startDate?.getTime() !==
                existingAssignment.startDate?.getTime() ||
                newAssignment.endDate?.getTime() !==
                  existingAssignment.endDate?.getTime() ||
                newAssignment.employee?.id !== existingAssignment.employee.id)
            ) {
              // If one of the fields of this assignment has changed, we send an update request
              // If not, we do nothing
              await updateAssignment(
                existingAssignment.id,
                {
                  ...newAssignment,
                  role: omit(roleToEdit, ["assignments"]),
                },
                newAssignment.employee?.name,
              );
            }

            // We then remove this assignment from the original array as we're done with it
            originalAssignments.splice(existingAssignmentIndex, 1);
          } else {
            // If the assignment is not existing, we create a new one
            assignmentsToAdd.push(newAssignment);
          }
        }
      }

      // If there is any assignment left in the original array, it means it's not in the form data and so
      // we need to delete it
      if (originalAssignments && originalAssignments.length > 0) {
        for (const assignment of originalAssignments) {
          await destroyAssignment(
            assignment.id,
            undefined,
            assignment.employee.name,
          );
        }
      }

      // Finally, we create any assignment that has beed added
      if (assignmentsToAdd && assignmentsToAdd.length > 0) {
        await addAssignmentsToRole(assignmentsToAdd, role);
      }

      mutate(`/projects/${project?.id}`);
    } catch (e) {
      throw e;
    }
  };

  const addAssignmentsToRole = async (
    assignments: NewAssignment[],
    role: Role,
  ) => {
    try {
      for (const assignment of assignments) {
        await createAssignment(
          {
            ...assignment,
            role: omit(role, ["assignments"]),
          },
          assignment.employee?.name,
        );
      }
    } catch (e) {
      throw e;
    }
  };

  const submitForm = async (data: RoleFormData) => {
    try {
      setStatus("pending");
      if (roleToEdit && project) {
        await submitEditRole(roleToEdit, data);
      } else if (project) {
        const newRole = {
          project: omit(project, ["roles"]),
          skills: skills.filter((skill) => skill.id === data.skillId),
          startDate: data.startDate,
          startConfidence: data.startConfidence || 1,
          endDate: data.endDate ? data.endDate : null,
          ...(!data.endConfidence && data.endConfidence !== 0
            ? { endConfidence: undefined }
            : { endConfidence: Number(data.endConfidence) }),
        };
        const newRoleId = await createRole(
          newRole,
          skills.filter((skill) => skill.id === data.skillId)?.[0]?.name,
          true,
        );

        const assignments = sanitizeAssignments(data.assignments);
        if (assignments?.length && Array.isArray(assignments) && newRoleId) {
          await addAssignmentsToRole(assignments, {
            ...newRole,
            id: newRoleId,
          });
          mutate(`/projects/${project?.id}`);
        }
      }

      setStatus("idle");
      handleClose();
    } catch (e) {
      setServerError(true);
      setStatus("idle");
    }
  };

  const hasRoleChanged = () => {
    const roleFields = [
      "startDate",
      "startConfidence",
      "endDate",
      "endConfidence",
    ];
    if (dirtyFields) {
      const dirtyFieldsTyped: Record<
        string,
        boolean | Record<string, boolean>[]
      > = dirtyFields;
      const changedFields = Object.keys(dirtyFields).filter(
        (key) => dirtyFieldsTyped[key],
      );
      return (
        dirtyFields &&
        changedFields &&
        changedFields.some((field) => roleFields.includes(field))
      );
    }
    return false;
  };

  const hasAssignmentsChanged = () => {
    return dirtyFields && dirtyFields.assignments;
  };

  async function submitEditRole(roleToEdit: Role, data: RoleFormData) {
    try {
      if (hasRoleChanged()) {
        await updateRole(
          roleToEdit.id,
          {
            project: omit(project, ["roles"]),
            skills: roleToEdit.skills,
            startDate: data.startDate,
            startConfidence: data.startConfidence || 1,
            endDate: data.endDate ? data.endDate : null,
            ...(!data.endConfidence && data.endConfidence !== 0
              ? { endConfidence: undefined }
              : { endConfidence: Number(data.endConfidence) }),
          },
          roleToEdit.skills[0].name,
          ["end_date", "end_confidence"],
          true,
        );
      }

      if (hasAssignmentsChanged()) {
        await compareAssignmentsForEdit(
          roleToEdit.assignments || [],
          data.assignments,
          roleToEdit,
        );
      }
    } catch (e) {
      await mutate(`/projects/${project?.id}`);
      throw e;
    }
  }

  const assignmentsOptions = employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
  }));

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textStyle="modal.title" pt={6} pl={6}>
          {roleToEdit ? "Edit Role" : "Add a New Role"}
        </ModalHeader>
        <ModalCloseButton mt={2} />
        <ModalBody pt={4}>
          <VStack spacing="30px" pb={6} align="start">
            {roleToEdit ? (
              <Heading as="h4" size="16px">
                {roleToEdit.skills[0]?.name}
              </Heading>
            ) : (
              <FormControl>
                <FormLabel>Select Skill</FormLabel>
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
            )}

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
                    valueAsNumber: true,
                  })}
                  aria-label="Start Date Confidence"
                  id="role_start_confidence"
                  name="startConfidence"
                  data-testid="startConfidenceInput"
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
                  {...roleEndDateInput}
                  id="role_end_date"
                  type="date"
                  data-testid="endDateInput"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="role_end_confidence">Confidence</FormLabel>
                <Select
                  {...roleEndConfidenceInput}
                  placeholder=" "
                  id="role_end_confidence"
                  aria-label="End Date Confidence"
                  data-testid="endConfidenceInput"
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
                        {/* Hidden input to store existing assignment ids, used for updating assignments */}
                        <input
                          type="hidden"
                          {...register(
                            `assignments.${index}.assignmentId` as const,
                          )}
                        />
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
                                classNamePrefix="assignmentSelect"
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
                                    primary25: "#319795",
                                    primary50: "#64CAC8",
                                    primary75: "#7EE4E2",
                                  },
                                })}
                              />
                            )}
                          />
                        </FormControl>
                        <FormControl width="28%">
                          {index < 1 ? (
                            <FormLabel id="assignment-start-date">
                              Start Date
                            </FormLabel>
                          ) : null}
                          <Input
                            {...register(
                              `assignments.${index}.startDate` as const,
                            )}
                            id={`assignment${index}_start_date`}
                            type="date"
                            aria-labelledby="assignment-start-date"
                          />
                        </FormControl>
                        <FormControl width="28%" id="assignment-end-date">
                          {index < 1 ? <FormLabel>End Date</FormLabel> : null}
                          <Input
                            {...register(
                              `assignments.${index}.endDate` as const,
                            )}
                            id={`assignment${index}_end_date`}
                            type="date"
                            aria-labelledby="assignment-end-date"
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
            <Button
              alignItems="center"
              flexDirection="row"
              cursor="pointer"
              _hover={{ color: "#2C7A7B" }}
              _active={{ background: "transparent" }}
              width="fit-content"
              background="transparent"
              onClick={addTeamMember}
              data-testid="add-team-member"
            >
              <AddIcon />
              <Text ml={2}>Add Team Member to this Role</Text>
            </Button>
          </FormControl>

          {serverError && (
            <Flex
              justifyContent="center"
              width="100%"
              marginTop="20px"
              data-testid="serviceError"
            >
              <ServiceError
                bg="red.100"
                color="gray.700"
                iconColor="red.500"
                textStyle="table.title"
                name="Server Error"
                width="95%"
                h="48px"
              >
                <Box
                  as="button"
                  onClick={() => setServerError(false)}
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
            aria-disabled={!canSubmitForm()}
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
  canSubmitForm: () => boolean;
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
    variant: canSubmitForm() ? "primary" : "primaryDisabled",
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
