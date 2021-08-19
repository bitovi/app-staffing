import { useEmployees } from "./useEmployees";
import styles from "./employees.module.scss";
import { useEffect, useState } from "react";
import { Employee } from "../../services/api";

export default function Employees(): JSX.Element {
  const { employees } = useEmployees();
  const [filterValue, setFilterValue] = useState<string>();
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>();

  useEffect(() => {
      if (filterValue) {

          if (employees) {
              const filtered = employees.filter((e) => e.name === filterValue); 
              setFilteredEmployees(filtered);
            } else {
                
            }
        } else {
            setFilteredEmployees(employees);
        }

  }, [filterValue, employees])

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
            // className="action-bar-icon"
            onClick={() => {
              alert("NOTIFICATIONS");
            }}
          >
            X
          </button>
          <button
            className={`${styles["settings"]} ${styles["action-bar-icon"]}`}
            // className="action-bar-icon"
            onClick={() => {
              alert("SETTINGS");
            }}
          >
            Y
          </button>
        </div>
      </div>
      <div className={styles["employee-table-action-row"]}>
        <button className={styles["add-employee-button"]}>
          Add Team Member +
        </button>
        {filterValue && (<div className={styles['filter-tag-wrapper']}><div className={styles['filter-tag']}>{filterValue}</div></div>)}
      </div>
      <div className={styles["employee-table-wrapper"]}>
        {filteredEmployees &&
          filteredEmployees.map((employee) => (
            <div key={employee.id} className={styles["employee-table-row"]}>
              Employee: {employee.name}
            </div>
          ))}
      </div>
    </>
  );
}
