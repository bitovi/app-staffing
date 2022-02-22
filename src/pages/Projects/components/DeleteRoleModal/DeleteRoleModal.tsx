import { useState } from "react";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { Role } from "../../../../services/api";
import { mutate } from "swr";

const DeleteRoleModal = ({
  role,
  setRole,
  destroyRole,
  projectId,
}: {
  role: Role | null;
  setRole: (role: Role | null) => void;
  destroyRole: (roleId: string) => void;
  projectId: string;
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isOpen = role != null;

  const onClose = () => {
    setRole(null);
  };

  const onConfirm = async () => {
    if (!role) return;

    setIsLoading(true);

    try {
      await destroyRole(role.id);
      setIsLoading(false);
      setRole(null);

      // Refresh the role list data after deleting the role
      mutate(`/projects/${projectId}`);
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
      confirmButtonVariant="modalConfirm"
      confirmLoadingText="Deleting Role ..."
      modalSize="lg"
      message={
        role
          ? `Are you sure you want to delete the ${role.skills?.[0].name} role?\nThis can't be undone.`
          : ""
      }
    />
  );
};

export default DeleteRoleModal;
