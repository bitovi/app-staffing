import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { useEmployees } from "./useEmployees";
import { Employee } from "../../services/api";
import EmployeeCard from "./components/EmployeeCard";

import styles from "./employees.module.scss";

export default function Employees(): JSX.Element {
  const { employees } = useEmployees();
  const [filterValue, setFilterValue] = useState<string>();
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>();
  const [isAdding, setIsAdding] = useState(false);
  const [idBeingEdited, setIdBeingEdited] = useState<string>();

  const handleSave = () => {
    // eslint-disable-next-line no-console
    console.log("SAVING!");
    setIdBeingEdited(undefined);
  };

  useEffect(() => {
    if (filterValue) {
      if (employees) {
        const filtered = employees.filter((e) =>
          e.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
        setFilteredEmployees(filtered);
      }
    } else {
      setFilteredEmployees(employees);
    }
  }, [filterValue, employees]);

  return (
    <>
      <div className={styles["action-bar"]}>
        <div className={styles["action-bar-title"]}>Team</div>
        <div className={styles["action-bar-actions"]}>
          <input
            onChange={(e) => setFilterValue(e.target.value)}
            type="text"
            placeholder="Filter"
            className={styles["action-bar-filter"]}
          />
          <button
            className={`${styles["alert"]} ${styles["action-bar-icon"]}`}
            onClick={() => {
              alert("NOTIFICATIONS");
            }}
          >
            X
          </button>
          <button
            className={`${styles["settings"]} ${styles["action-bar-icon"]}`}
            onClick={() => {
              alert("SETTINGS");
            }}
          >
            Y
          </button>
        </div>
      </div>
      <div className={styles["employee-table-action-row"]}>
        <button
          className={styles["add-employee-button"]}
          onClick={() => {
            setIsAdding(true);
          }}
        >
          Add Team Member +
        </button>
        {filterValue && (
          <div className={styles["filter-tag-wrapper"]}>
            <div className={styles["filter-tag"]}>{filterValue}</div>
          </div>
        )}
      </div>
      <div className={styles["employee-table-wrapper"]}>
        {isAdding && (
          <div
            className={classNames(
              styles["employee-table-row"],
              styles["employee-table-row"],
            )}
          >
            Employee: <input></input>
          </div>
        )}
        {filteredEmployees &&
          filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              editing={idBeingEdited === employee.id}
              onEdit={() => setIdBeingEdited(employee.id)}
              onSave={handleSave}
            />
          ))}
      </div>
    </>
  );
}
