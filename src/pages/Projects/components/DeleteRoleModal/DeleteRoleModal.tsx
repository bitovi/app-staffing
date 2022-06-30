import { useState } from "react";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { Role } from "../../../../services/api";

const DeleteRoleModal = ({
  roleToDelete,
  setRole,
  destroyRole,
  projectId,
}: {
  roleToDelete: Role | null;
  setRole: (role: Role | null) => void;
  destroyRole: (
    roleId: string,
    projectId: string,
    identifier: string,
    updateParentCache?: boolean,
  ) => void;
  projectId: string;
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isOpen = roleToDelete != null;

  const onClose = () => {
    setRole(null);
  };

  const onConfirm = async () => {
    if (!roleToDelete) return;

    setIsLoading(true);

    try {
      await destroyRole(
        roleToDelete.id,
        projectId,
        roleToDelete.skills?.[0]?.name,
        true,
      );
      setIsLoading(false);
      setRole(null);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      error={error || undefined}
      isLoading={isLoading}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Role"
      closeText="Cancel"
      confirmText="Delete & Close"
      variant="modalConfirm"
      loadingText="Deleting Role ..."
      modalSize="lg"
      message={
        roleToDelete
          ? `Are you sure you want to delete the ${roleToDelete.skills?.[0]?.name} role?\nThis can't be undone.`
          : ""
      }
    />
  );
};

export default DeleteRoleModal;
