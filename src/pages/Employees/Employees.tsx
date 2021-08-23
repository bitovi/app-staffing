import type { Employee } from "../../services/api";

import { useEffect, useState } from "react";

import { useEmployees } from "./useEmployees";
import EmployeeTable from "./components/EmployeeTable";

import styles from "./Employees.module.scss";

import { ReactComponent as BellSVG } from "./assets/vectors/bell.svg";
import { ReactComponent as GearSVG } from "./assets/vectors/gear.svg";

export default function Employees(): JSX.Element {
  const { employees } = useEmployees();
  const [filterValue, setFilterValue] = useState<string>();
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [idBeingEdited, setIdBeingEdited] = useState<string>();

  const handleEditSave = (employee: Employee) => {
    // eslint-disable-next-line no-console
    console.log("SAVING:", employee);
    setIdBeingEdited(undefined);
  };

  const handleEditCancel = () => {
    // eslint-disable-next-line no-console
    console.log("CANCELING!");
    setIdBeingEdited(undefined);
  };

  const handleAddSave = (employee: Employee) => {
    // eslint-disable-next-line no-console
    console.log("SAVING:", employee);
    setIsAdding(false);
  };

  const handleAddCancel = () => {
    // eslint-disable-next-line no-console
    console.log("CANCELING!");
    setIsAdding(false);
  };

  useEffect(() => {
    if (employees) {
      if (filterValue) {
        const filtered = employees.filter((e) =>
          e.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
        setFilteredEmployees(filtered);
      } else {
        setFilteredEmployees(employees);
      }
    }
  }, [filterValue, employees]);

  return (
    <div className={styles["wrapper"]}>
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
            title="Notifications"
            onClick={() => {
              alert("NOTIFICATIONS");
            }}
          >
            <BellSVG className={styles["icon"]} />
          </button>
          <button
            className={`${styles["settings"]} ${styles["action-bar-icon"]}`}
            title="Settings"
            onClick={() => {
              alert("SETTINGS");
            }}
          >
            <GearSVG className={styles["icon"]} />
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
      </div>
      {!employees && (
        <div className={styles["empty-state-text"]}>LOADING ...</div>
      )}
      {employees && employees.length === 0 && (
        <div className={styles["empty-state-text"]}>NO DATA FOUND!</div>
      )}
      {employees && employees.length && (
        <EmployeeTable
          filterValue={filterValue}
          isAdding={isAdding}
          filteredEmployees={filteredEmployees}
          idBeingEdited={idBeingEdited}
          setIdBeingEdited={setIdBeingEdited}
          handleAddSave={handleAddSave}
          handleEditSave={handleEditSave}
          handleAddCancel={handleAddCancel}
          handleEditCancel={handleEditCancel}
        />
      )}
    </div>
  );
}
