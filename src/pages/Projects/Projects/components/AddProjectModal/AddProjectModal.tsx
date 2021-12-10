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
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { Project, useProjects } from "../../../../../services/api";

type IFormData = Omit<Project, "id">;

const initialFormState: IFormData = { name: "", description: "", roles: [] };

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function AddProjectModal({
  isOpen,
  onClose,
}: IProps): JSX.Element {
  const { reset, addProject } = useProjects();
  const history = useHistory();
  const [newProject, setNewProject] = useState<IFormData>(initialFormState);

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
    reset();
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
