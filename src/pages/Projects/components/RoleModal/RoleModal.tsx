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
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { useForm, Controller } from "react-hook-form";
import type { Project, Skill, Role } from "../../../../services/api";
import { AddIcon } from "@chakra-ui/icons";
import parseISO from "date-fns/parseISO";
import range from "lodash/range";
import omit from "lodash/omit";
import isNil from "lodash/isNil";

interface RoleModalProps {
  createRole: (
    data: Partial<Omit<Role, "id">>,
    identifier: string,
  ) => Promise<string | undefined>;
  onClose: () => void;
  isOpen: boolean;
  skills: Skill[];
  project?: Project;
}

interface RoleFormData {
  skillId: string;
  startDate: string;
  startConfidence?: number;
  endDate: string;
  endConfidence?: number | null;
}

type SaveButtonStatus = "idle" | "pending";

export default function RoleModal({
  createRole,
  onClose,
  isOpen,
  skills,
  project,
}: RoleModalProps): JSX.Element {
  const [serverError, setServerError] = useState(false);
  const [status, setStatus] = useState<SaveButtonStatus>("idle");
  const {
    register,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RoleFormData>({
    defaultValues: {
      startConfidence: 1,
    },
  });

  const roleStartDate = watch("startDate");
  const roleStartConfidence = watch("startConfidence");
  const canSubmitForm = roleStartDate && roleStartConfidence ? true : false;

  const resetForm = () => {
    reset({
      startDate: "",
      startConfidence: 1,
      endDate: "",
      endConfidence: null,
      skillId: "",
    });
  };

  const submitForm = async (data: RoleFormData) => {
    try {
      setStatus("pending");
      if (project) {
        await createRole(
          {
            project: omit(project, ["roles"]),
            skills: skills.filter((skill) => skill.id === data.skillId),
            startDate: data.startDate ? parseISO(data.startDate) : undefined,
            startConfidence: data.startConfidence,
            endDate: data.endDate ? parseISO(data.endDate) : undefined,
            ...(isNil(data.endConfidence)
              ? null
              : { endConfidence: data.endConfidence }),
          },
          skills.filter((skill) => skill.id === data.skillId)?.[0]?.name,
        );
      }
      resetForm();
      setStatus("idle");
      onClose();
    } catch (e) {
      setServerError(!serverError);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
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
                        <Radio key={skill.id} value={skill.id}>
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
              {project && project?.roles?.length === 0 && (
                <Flex
                  width="100%"
                  height="118px"
                  flexDirection="row"
                  boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
                  padding="50px 30px"
                  backgroundColor="#F7F7F7"
                  border="1px solid #eee"
                  borderRadius="4px"
                  alignItems="center"
                >
                  <Image
                    height="77px"
                    width="64px"
                    src="/assets/images/folderWithFile.png"
                    alt="Folder With File"
                    opacity="60%"
                  />
                  <Text fontSize="14px" fontFamily="Montserrat">
                    There are currently no team members assigned to this
                    project, Add some.
                  </Text>
                </Flex>
              )}
            </FormControl>
          </VStack>
          <FormControl>
            <Flex alignItems="center" flexDirection="row">
              <AddIcon />
              <Text ml={2}>Add Team Member to this Role</Text>
            </Flex>
          </FormControl>
        </ModalBody>

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
