import classNames from "classnames";
import React from "react";
import { Employee } from "../../../../services/api";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import styles from "../../employees.module.scss";

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
        <div className={styles["empty-state-text"]}>
          NO RESULTS MATCHING: {filterValue}
        </div>
      )}
      {/* {!filteredEmployees.length && ( */}
      <div className={styles["employee-table-wrapper"]}>
        {isAdding && (
          <div
            className={classNames(
              styles["employee-table-row"],
              styles["employee-table-row"],
            )}
          >
            Employee: <input></input>
            <button
              onChange={() => {
                // handleAddSave();
              }}
            >
              SAVE
            </button>
            <button
              onChange={() => {
                handleAddCancel();
              }}
            >
              CANCEL
            </button>
          </div>
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
            onSave={() => {
              // setHandleEditSave()
            }}
            handleCancel={handleEditCancel}
          />
        ))}
    </>
  );
}
