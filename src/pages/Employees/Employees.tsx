import type { Employee } from "../../services/api";

import { useEffect, useState } from "react";
import classnames from "classnames";

import { useEmployees } from "../../services/api";
import EmployeeTable from "./components/EmployeeTable";

import styles from "./Employees.module.scss";

import { ReactComponent as BellSVG } from "./assets/vectors/bell.svg";
import { ReactComponent as GearSVG } from "./assets/vectors/gear.svg";

export default function Employees(): JSX.Element {
  const { data: employees, refresh } = useEmployees();

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
    // Todo: separate out into a hook
    fetch("/v1", { method: "POST", body: JSON.stringify(employee) }).then(
      (_) => {
        refresh?.();
      },
    );

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
    <div className={styles.wrapper}>
      <div className={styles.actionBar}>
        <div className={styles.actionBarTitle}>Team</div>
        <div className={styles.actionBarActions}>
          <input
            onChange={(e) => setFilterValue(e.target.value)}
            type="text"
            placeholder="Filter"
            className={styles.actionBarFilter}
          />
          <button
            className={classnames(styles.alert, styles.actionBarIcon)}
            title="Notifications"
            onClick={() => {
              alert("NOTIFICATIONS");
            }}
          >
            <BellSVG className={styles.icon} />
          </button>
          <button
            className={classnames(styles.settings, styles.actionBarIcon)}
            title="Settings"
            onClick={() => {
              alert("SETTINGS");
            }}
          >
            <GearSVG className={styles.icon} />
          </button>
        </div>
      </div>
      <div className={styles.row}>
        <button
          className={styles.addButton}
          onClick={() => {
            setIsAdding(true);
          }}
        >
          Add Team Member +
        </button>
      </div>
      {!employees && <div className={styles.noResults}>LOADING ...</div>}
      {employees && employees.length === 0 && (
        <div className={styles.noResults}>NO DATA FOUND!</div>
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
