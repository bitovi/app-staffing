import { useDisclosure } from "@chakra-ui/hooks";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../../../components/Button";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { useProjects } from "../../../../services/api";

interface IProps {
  projectId: string;
  projectName: string;
}

const ProjectDeleteButton = ({
  projectId,
  projectName,
}: IProps): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const currentProject = useRef(false);
  const { deleteProject, error, isLoading, reset } = useProjects();
  const history = useHistory();

  const onDelete = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      currentProject.current = false;
      onClose();
      history.push("/");
    } catch (e) {
      // Eat Error
    }
  };

  useEffect(() => {
    // Ref used here as a workaround to avoid infinite error loop, STAF-154 created
    if (currentProject.current === false) {
      currentProject.current = true;
      !isOpen && reset();
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
        message={`Are you sure you want to delete the ${projectName} project? This can’t be undone.`}
        confirmText="Yes, Remove & Delete"
        closeText="No, Return to Page"
        error={
          error ? error?.message?.toString() ?? "Unable to delete Project." : ""
        }
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        confirmButtonVariant="danger"
      />
    </>
  );
};

export default ProjectDeleteButton;
