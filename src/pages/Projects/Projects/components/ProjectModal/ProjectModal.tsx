import { NewProject, Project } from "../../../../../services/api";

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

interface ProjectFormData {
  name: string;
  description?: string;
}

interface ProjectModalProps {
  onClose: () => void;
  isOpen: boolean;
  addProject?: (project: NewProject) => void;
  updateProject?: (id: string, updated: Partial<Project>) => void;
  project?: Project;
}

type SaveButtonStatus = "idle" | "pending";

export default function ProjectModal({
  isOpen,
  onClose,
  addProject,
  project,
  updateProject,
}: ProjectModalProps): JSX.Element {
  const history = useHistory();
  const [serverError, setServerError] = useState(false);
  const [customFormError, setCustomFormError] = useState("");
  const [status, setStatus] = useState<SaveButtonStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    setError,
    formState: { errors, isDirty },
  } = useForm<ProjectFormData>({
    defaultValues: project ? project : undefined,
  });
  const projectName = watch("name");
  const isNewProject = isEmpty(project);
  const addNewProject = async () => {
    if (addProject) {
      try {
        setStatus("pending");
        const desc = getValues("description");
        const newProjectId = await addProject({
          name: projectName,
          description: desc,
        });
        history.push(`/projects/${newProjectId}`);
        resetForm();
        onClose();
        setStatus("idle");
        setServerError(false);
      } catch (e) {
        setServerError(true);
      }
    }
  };

  const update = async () => {
    if (!isDirty) {
      setCustomFormError("No Changes Made");
    } else {
      if (project && updateProject && isDirty) {
        try {
          setStatus("pending");
          const desc = getValues("description");
          updateProject(project.id, { name: projectName, description: desc });
          resetForm();
          onClose();
          setStatus("idle");
          setServerError(false);
        } catch (e) {
          setServerError(true);
        }
      }
    }
  };

  const resetForm = () => {
    setCustomFormError("");
    reset({
      name: project ? project.name : "",
      description: project ? project.description : "",
    });
  };

  useEffect(() => {
    if (project) {
      setValue("name", project.name);
      setValue("description", project.description);
    }
  }, [isOpen, project, setValue]);
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
            <FormControl
              isRequired
              isInvalid={!!errors.name || !!customFormError}
            >
              <FormLabel>Project Name</FormLabel>
              <Input
                {...register("name", {
                  required: "Project Name not filled out",
                  validate: (name) =>
                    fullNameProvided(name) || "Full name required",
                })}
                onChange={() => setCustomFormError("")}
                aria-label="Project Name"
                data-testid="projectInput"
              />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.description || !!customFormError}>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register("description")}
                aria-label="Description"
                name="description"
              />
              <FormErrorMessage>
                {errors?.description?.message}
              </FormErrorMessage>
              <FormErrorMessage>{customFormError}</FormErrorMessage>
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
              canSubmit: isDirty && fullNameProvided(projectName),
              isNewProject,
              onClick: handleSubmit(() =>
                project ? update() : addNewProject(),
              ),
            })}
            aria-disabled={!isDirty || !fullNameProvided(projectName)}
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
  canSubmit,
  isNewProject,
  onClick,
}: {
  status: SaveButtonStatus;
  canSubmit: boolean;
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
    variant: canSubmit ? "primary" : "primaryDisabled",
    onClick,
  };
}
