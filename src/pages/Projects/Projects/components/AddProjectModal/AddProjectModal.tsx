import { Stack } from "@chakra-ui/layout";
import { ModalBody, ModalFooter } from "@chakra-ui/modal";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../../../../components/Button";
import { InputControl, TextArea } from "../../../../../components/formControls";
import Modal from "../../../../../components/Modal";
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
    <Modal size="lg" isOpen={isOpen} onClose={onCloseModal} title="Add Project">
      <ModalBody>
        <Stack spacing={4}>
          <InputControl
            name="name"
            label="Project name"
            onChange={handleChange}
            value={newProject.name}
          />
          <TextArea
            label="Description"
            onChange={handleChange}
            name="description"
            value={newProject.description}
          />
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button mr={4} variant="link" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={addNewProject}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}
