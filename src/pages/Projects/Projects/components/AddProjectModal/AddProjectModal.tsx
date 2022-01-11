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
  Textarea,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";
// import { useEffect } from "@storybook/addons";

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
  const projectData = project ? toProjectFormData(project) : undefined;
  console.log("project", project);

  // const [serverError, setServerError] = useState(false);
  const [status, setStatus] = useState<SaveButtonStatus>("idle");

  const history = useHistory();

  const [newProject, setNewProject] = useState<FormData>(initialFormState);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { isDirty: formIsDirty },
  } = useForm<ProjectFormData>({
    defaultValues: projectData,
  });

  const isNewProject = isEmpty(projectData);
  const projectName = watch("name");
  const canSubmitForm =
    (isNewProject && fullNameProvided(projectName)) ||
    (!isNewProject && formIsDirty && fullNameProvided(projectName));

  const addNewProject = async () => {
    setStatus("pending")
    const newProjectId = await addProject(newProject);
    history.push(`/projects/${newProjectId}`);
    setStatus("idle");
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

  const onCloseModal = () => {
    setNewProject(initialFormState);
    reset({ name: "", description: "" })
    onClose();
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
    <Modal
      size="md"
      isOpen={isOpen}
      onClose={onCloseModal}
      variant="project_modal"
    >
      <ModalOverlay />
      <ModalContent mt="14vh">
        <ModalHeader textStyle="modal.title" pt={6} pl={6}>
          Add Project
        </ModalHeader>
        <ModalCloseButton mt={2} />
        <Divider pt={2} />
        <ModalBody pt={4}>
          <VStack spacing="16px" pb={6}>
            <FormControl isRequired>
              <FormLabel>Project Name</FormLabel>
              <Input
                {...register("name", {
                  required: "Project Name not filled out",
                  validate: (name) =>
                    fullNameProvided(name) || "Full name required",
                })}
                onChange={handleChange}
                data-testid="projectInput"
                id="projectName"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                label="Description"
                onChange={handleChange}
                name="description"
                data-testid="projectDescription"
                value={newProject.description}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <Divider pt={1} />
        <ModalFooter>
          <Button variant="outline" mr="8px" onClick={onCloseModal}>
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
  return name ? name.split("").length >= 1 : false;
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
