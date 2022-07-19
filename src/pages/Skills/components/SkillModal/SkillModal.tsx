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
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import { Skill } from "../../../../services/api";
import { ServiceError } from "../../../../components/ServiceError";

export interface SkillFormData {
  name: string;
}
interface SkillModalProps {
  onSave: (data: Omit<Skill, "id">) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
  skill?: Skill;
}

type SaveButtonStatus = "idle" | "pending";

export default function SkillModal({
  onSave,
  onClose,
  isOpen,
  skill,
}: SkillModalProps): JSX.Element {
  const [serverError, setServerError] = useState(false);
  const [status, setStatus] = useState<SaveButtonStatus>("idle");
  const skillData = skill ? toSkillFormData(skill) : undefined;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty: formIsDirty },
  } = useForm<SkillFormData>({
    defaultValues: skillData,
  });

  const isNewSkill = isEmpty(skillData);
  const skillName = watch("name");

  const canSubmitForm =
    (isNewSkill && nameProvided(skillName)) ||
    (!isNewSkill && formIsDirty && nameProvided(skillName));

  const submitForm = async (data: SkillFormData) => {
    if (canSubmitForm) {
      try {
        setStatus("pending");
        await onSave({
          name: data.name,
        });
        reset({ name: "" });
        setStatus("idle");
        onClose();
      } catch (e) {
        setServerError(!serverError);
      }
    }
  };

  const resetForm = () => {
    reset(
      skill
        ? toSkillFormData(skill)
        : {
            name: "",
          },
    );
  };

  // Reset the form fields if the `skill` prop changes while the modal is
  // mounted
  useEffect(resetForm, [skill, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" variant="team_modal">
      <ModalOverlay />
      <ModalContent mt="14vh">
        <ModalHeader textStyle="modal.title" pt={6} pl={6}>
          {isNewSkill ? "Add a New Skill" : "Edit Skill"}
        </ModalHeader>
        <ModalCloseButton mt={2} />
        <Divider pt={2} />
        <ModalBody pt={4}>
          <VStack spacing="16px" pb={6}>
            <FormControl isRequired isInvalid={errors.name ? true : false}>
              <FormLabel>Skill Name</FormLabel>
              <Input
                {...register("name", {
                  required: "Name not filled out",
                  validate: (name) =>
                    nameProvided(name) || "Skill name required",
                })}
                id="name"
                placeholder="name"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
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
              isNewSkill,
              onClick: handleSubmit((data) => submitForm(data)),
            })}
            aria-disabled={!canSubmitForm}
          >
            {isNewSkill ? "Add & Close" : "Save & Close"}
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
  isNewSkill,
  onClick,
}: {
  status: SaveButtonStatus;
  canSubmitForm: boolean;
  isNewSkill: boolean;
  onClick: () => Promise<void>;
}) {
  if (status === "pending" && !isNewSkill) {
    return {
      isLoading: true,
      isDisabled: true,
      loadingText: "Editing Skill",
    };
  } else if (status === "pending" && isNewSkill) {
    return {
      isLoading: true,
      isDisabled: true,
      loadingText: "Adding Skill",
    };
  }

  return {
    variant: canSubmitForm ? "primary" : "primaryDisabled",
    onClick,
  };
}

function toSkillFormData(data: Skill): SkillFormData {
  return {
    name: data.name,
  };
}
