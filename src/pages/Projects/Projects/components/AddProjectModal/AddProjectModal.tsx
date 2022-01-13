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
  const projectData = project ? toProjectFormData(project) : undefined;

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty: formIsDirty },
  } = useForm<ProjectFormData>({
    defaultValues: projectData,
  });

  const isNewProject = isEmpty(projectData);
  const projectName = watch("name");
  const canSubmitForm =
    (isNewProject && fullNameProvided(projectName)) ||
    (!isNewProject && formIsDirty && fullNameProvided(projectName));

  const addNewProject = async () => {
    try {
      setStatus("pending");
      const newProjectId = await addProject(newProject);
      reset({ name: "", description: "" });
      onClose();
      history.push(`/projects/${newProjectId}`);
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
    reset(
      project
        ? toProjectFormData(project)
        : {
            name: "",
            description: "",
          },
    );
  };

  useEffect(resetForm, [project, reset]);

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
        <Divider pt={2} />
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
          <Button variant="primary" onClick={addNewProject}>
            Save &amp; Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function fullNameProvided(name: string) {
  return name ? name.trim().split("").length >= 1 : false;
}

function toProjectFormData(data: Project): ProjectFormData {
  const roles: Record<string, boolean> = {};

  data?.roles?.forEach(({ id }) => {
    roles[id] = true;
  });

  return {
    name: data.name,
    description: data.description,
    roles,
  };
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
      loadingText: "Saving",
    };
  }

  return {
    variant: canSubmitForm ? "primary" : "primaryDisabled",
    onClick,
  };
}
