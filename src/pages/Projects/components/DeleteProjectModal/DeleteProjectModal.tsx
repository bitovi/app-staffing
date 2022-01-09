import { useHistory } from "react-router-dom";

import ConfirmationModal from "../../../../components/ConfirmationModal";

interface DeleteProjectModalProps {
  projectId: string;
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
  destroyProject: (id: string) => Promise<void>;
}

const DeleteProjectModal = ({
  projectId,
  projectName,
  isOpen,
  onClose,
  destroyProject,
}: DeleteProjectModalProps): JSX.Element => {
  const history = useHistory();

  const onCloseModal = () => {
    onClose();
  };

  const onDelete = async (projectId: string) => {
    try {
      await destroyProject(projectId);
      onCloseModal();
      history.push("/");
    } catch (e) {
      // Eat Error
    }
  };

  return (
    <ConfirmationModal
      onConfirm={() => onDelete(projectId)}
      title="Delete Project?"
      message={`Are you sure you want to delete the ${projectName} project? This can’t be undone.`}
      confirmText="Yes, Remove & Delete"
      closeText="No, Return to Page"
      isOpen={isOpen}
      onClose={onCloseModal}
      confirmButtonVariant="danger"
    />
  );
};

export default DeleteProjectModal;
