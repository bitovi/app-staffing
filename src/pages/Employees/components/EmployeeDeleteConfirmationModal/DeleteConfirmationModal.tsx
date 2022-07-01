import { useState } from "react";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { Employee } from "../../../../services/api";

export default function DeleteConfirmationModal({
  employee,
  setEmployee,
  destroyEmployee,
}: {
  employee: Employee | null;
  setEmployee: (employee: Employee | null) => void;
  destroyEmployee: (employeeId: string) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isOpen = employee != null;

  const onClose = () => {
    setEmployee(null);
  };

  const onConfirm = async () => {
    if (!employee) return;

    setIsLoading(true);

    try {
      await destroyEmployee(employee.id);
      setIsLoading(false);
      setEmployee(null);
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
      title="Delete Team Member"
      closeText="Cancel"
      confirmText="Delete Team Member"
      variant="modalConfirm"
      loadingText="Deleting Team Member ..."
      modalSize="lg"
      message={
        employee
          ? `You are about to remove ${employee.name}. This can't be undone.`
          : ""
      }
    />
  );
}
