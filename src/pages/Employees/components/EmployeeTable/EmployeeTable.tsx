import type { NewEmployee, Employee } from "../../../../services/api";

import EmployeeCard from "../EmployeeCard";

import styles from "./EmployeeTable.module.scss";

export default function EmployeeTable({
  filterValue,
  isAdding,
  filteredEmployees,
  idBeingEdited,
  setIdBeingEdited,
  onAdd,
  onEdit,
  onAddCancel,
  onEditCancel,
}: {
  filterValue?: string;
  isAdding: boolean;
  filteredEmployees: Employee[];
  idBeingEdited?: string;
  setIdBeingEdited: (id: string) => void;
  onAdd: (employee: NewEmployee) => void;
  onAddCancel: () => void;
  onEdit: (employee: Employee) => void;
  onEditCancel: () => void;
}): JSX.Element {
  return (
    <>
      {!filteredEmployees.length && !isAdding && (
        <div className={styles.noResults}>
          NO RESULTS MATCHING: {filterValue}
        </div>
      )}
      {/* {!filteredEmployees.length && ( */}
      <div className={styles.wrapper}>
        {isAdding && (
          <EmployeeCard
            employee={{
              name: "",
              startDate: "01/01/2021",
              endDate: "",
              skills: [],
            }}
            editing
            onSave={onAdd}
            onCancel={onAddCancel}
          />
        )}
      </div>
      {/* )} */}
      {filteredEmployees &&
        filteredEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            editing={idBeingEdited === employee.id}
            onEdit={() => setIdBeingEdited(employee.id)}
            onSave={onEdit}
            onCancel={onEditCancel}
          />
        ))}
    </>
  );
}
