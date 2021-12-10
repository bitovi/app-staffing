import { useHistory } from "react-router-dom";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { useProjects } from "../../../../services/api";

interface IProps {
  projectId: string;
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteProjectModal = ({
  projectId,
  projectName,
  isOpen,
  onClose,
}: IProps): JSX.Element => {
  const { deleteProject, error, isLoading, reset } = useProjects();
  const history = useHistory();

  const onCloseModal = () => {
    reset();
    onClose();
  };

  const onDelete = async (projectId: string) => {
    try {
      await deleteProject(projectId);
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
      error={
        error ? error?.message?.toString() ?? "Unable to delete Project." : ""
      }
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onCloseModal}
      confirmButtonVariant="danger"
    />
  );
};

export default DeleteProjectModal;
