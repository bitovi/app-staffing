import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

import ConfirmationModal from "../../../../components/ConfirmationModal";
import { TrashIcon } from "../../../assets";

interface ProjectDeleteButtonProps {
  projectId: string;
  projectName: string;
  destroyProject: (id: string) => Promise<void>;
}

const ProjectDeleteButton = ({
  projectId,
  projectName,
  destroyProject,
}: ProjectDeleteButtonProps): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const currentProject = useRef(false);
  const history = useHistory();

  const onDelete = async (projectId: string) => {
    try {
      await destroyProject(projectId);
      currentProject.current = false;
      onClose();
      history.push("/");
    } catch (e) {
      // Eat Error
    }
  };

  return (
    <>
      <IconButton
        ml="8px"
        variant="deleteAction"
        aria-label="Delete Project"
        fontSize="20px"
        icon={<TrashIcon fill="currentColor" />}
        onClick={onOpen}
      />

      <ConfirmationModal
        onConfirm={() => onDelete(projectId)}
        title="Delete Project?"
        message={`Are you sure you want to delete the ${projectName} project? This can’t be undone.`}
        confirmText="Yes, Remove & Delete"
        closeText="No, Return to Page"
        isOpen={isOpen}
        onClose={onClose}
        confirmButtonVariant="danger"
      />
    </>
  );
};

export default ProjectDeleteButton;
