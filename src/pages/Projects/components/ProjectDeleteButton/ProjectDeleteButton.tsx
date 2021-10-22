import { useDisclosure } from "@chakra-ui/hooks";
import { useEffect } from "react";
import Button from "../../../../components/Button";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { useProjects } from "../../../../services/api";

interface IProps {
  projectId: string;
}

const ProjectDeleteButton = ({ projectId }: IProps): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deleteProject, error, isLoading, reset } = useProjects();

  const onDelete = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      onClose();
    } catch (e) {
      // Eat Error
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <>
      <Button onClick={onOpen} variant="primary">
        Delete
      </Button>

      <ConfirmationModal
        onConfirm={() => onDelete(projectId)}
        title="Delete Project?"
        message="Are you sure you want to delete the Nike store project? This can’t be undone."
        confirmText="Yes, Remove & Delete"
        closeText="No, Return to Page"
        error={
          error ? error?.message?.toString() ?? "Unable to delete Project." : ""
        }
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ProjectDeleteButton;