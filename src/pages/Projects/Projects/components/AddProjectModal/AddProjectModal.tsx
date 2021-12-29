import type { NewProject, Project } from "../../../../../services/api";

import { useState } from "react";
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

type FormData = Omit<Project, "id">;

const initialFormState: FormData = { name: "", description: "", roles: [] };

interface AddProjectModalProps {
  onClose: () => void;
  isOpen: boolean;
  addProject: (project: NewProject) => void;
}

export default function AddProjectModal({
  isOpen,
  onClose,
  addProject,
}: AddProjectModalProps): JSX.Element {
  const history = useHistory();

  const [newProject, setNewProject] = useState<FormData>(initialFormState);

  const addNewProject = async () => {
    const newProjectId = await addProject(newProject);
    history.push(`/projects/${newProjectId}`);
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
    // reset(); TODO: look into ramifications of removing reset
    setNewProject(initialFormState);
    onClose();
  };

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
                name="name"
                label="Project name"
                data-testid="projectInput"
                onChange={handleChange}
                value={newProject.name}
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
        <ModalFooter>
          <Button mr={4} variant="link" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addNewProject}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
