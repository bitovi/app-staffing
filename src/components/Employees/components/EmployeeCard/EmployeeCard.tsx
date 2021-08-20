import { Employee } from "../../../../services/api";
import styles from "./EmployeeCard.module.scss";

export default function EmployeeCard({
  employee,
  editing,
  onEdit,
  onSave,
  handleCancel,
}: {
  employee: Employee;
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  handleCancel: () => void;
}): JSX.Element {
  return (
    <div className={styles["employee-table-row"]}>
      Employee: {employee.name}
    </div>
  );
}
