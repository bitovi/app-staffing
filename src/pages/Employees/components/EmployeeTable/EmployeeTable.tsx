import type { Employee } from "../../../../services/api";

import EmployeeCard from "../EmployeeCard";

import styles from "./EmployeeTable.module.scss";

export default function EmployeeTable({
  filterValue,
  isAdding,
  filteredEmployees,
  idBeingEdited,
  setIdBeingEdited,
  handleAddSave,
  handleEditSave,
  handleAddCancel,
  handleEditCancel,
}: {
  filterValue?: string;
  isAdding: boolean;
  filteredEmployees: Employee[];
  idBeingEdited?: string;
  setIdBeingEdited: (id: string) => void;
  handleAddSave: (employee: Employee) => void;
  handleAddCancel: () => void;
  handleEditSave: (employee: Employee) => void;
  handleEditCancel: () => void;
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
              id: "1234",
              avatar:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              name: "",
              title: "",
              startDate: "01/01/2021",
              endDate: "",
              skills: [],
              available: true,
            }}
            editing={true}
            onEdit={() => setIdBeingEdited("1234")}
            onSave={handleEditCancel}
            onCancel={handleEditCancel}
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
            onSave={handleEditCancel}
            onCancel={handleEditCancel}
          />
        ))}
    </>
  );
}