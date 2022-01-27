import type { NewProject, Project } from "../../../../../services/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  ModalBody,
  ModalFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Input,
  VStack,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Flex,
  Box,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import { ServiceError } from "../../../../../components/ServiceError";

type FormData = Omit<Project, "id">;

interface ProjectFormData {
  name: string;
  description?: string;
}

const initialFormState: FormData = { name: "", description: "" };

interface AddProjectModalProps {
  onClose: () => void;
  isOpen: boolean;
  addProject: (project: NewProject) => void;
  project?: Project;
}

type SaveButtonStatus = "idle" | "pending";

export default function AddProjectModal({
  isOpen,
  onClose,
  addProject,
  project,
}: AddProjectModalProps): JSX.Element {
  const history = useHistory();
  const [serverError, setServerError] = useState(false);
  const [status, setStatus] = useState<SaveButtonStatus>("idle");
  const [newProject, setNewProject] = useState<FormData>(initialFormState);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty: formIsDirty },
  } = useForm<ProjectFormData>({
    defaultValues: project ? project : undefined,
  });

  const isNewProject = isEmpty(project);
  const projectName = watch("name");
  const canSubmitForm =
    (isNewProject && fullNameProvided(projectName)) ||
    (!isNewProject && formIsDirty && fullNameProvided(projectName));

  const addNewProject = async () => {
    try {
      setStatus("pending");
      const newProjectId = await addProject(newProject);
      history.push(`/projects/${newProjectId}`);
      resetForm();
      onClose();
      setStatus("idle");
    } catch (e) {
      setServerError(!serverError);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setNewProject((newProject) => ({
      ...newProject,
      [name]: value,
    }));
  };

  const resetForm = () => {
    reset({ name: "", description: "" });
    setNewProject(initialFormState);
  };

  useEffect(resetForm, [reset, project]);

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose} variant="project_modal">
      <ModalOverlay />
      <ModalContent mt="14vh">
        <ModalHeader textStyle="modal.title" pt={6} pl={6}>
          {isNewProject ? "Add Project" : "Edit Project Name and Description"}
        </ModalHeader>
        <ModalCloseButton
          mt={2}
          onClick={() => {
            resetForm();
            onClose();
          }}
        />
        <ModalBody pt={4}>
          <VStack spacing="16px" pb={6}>
            <FormControl isRequired isInvalid={errors.name ? true : false}>
              <FormLabel>Project Name</FormLabel>
              <Input
                {...register("name", {
                  required: "Project Name not filled out",
                  validate: (name) =>
                    fullNameProvided(name) || "Full name required",
                })}
                label="Project Name"
                onChange={handleChange}
                data-testid="projectInput"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                label="Description"
                onChange={handleChange}
                name="description"
                value={newProject.description}
              />
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
              isNewProject,
              onClick: handleSubmit(() => addNewProject()),
            })}
            aria-disabled={!canSubmitForm}
          >
            {isNewProject ? "Add & Close" : "Save & Close"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function fullNameProvided(name: string) {
  return name ? name.trim().split("").length >= 1 : false;
}

function getSubmitButtonProps({
  status,
  canSubmitForm,
  isNewProject,
  onClick,
}: {
  status: SaveButtonStatus;
  canSubmitForm: boolean;
  isNewProject: boolean;
  onClick: () => Promise<void>;
}) {
  if (status === "pending" && !isNewProject) {
    return {
      isLoading: true,
      isDisabled: true,
      loadingText: "Editing Project",
    };
  } else if (status === "pending" && isNewProject) {
    return {
      isLoading: true,
      isDisabled: true,
      loadingText: "Adding Project",
    };
  }

  return {
    variant: canSubmitForm ? "primary" : "primaryDisabled",
    onClick,
  };
}
