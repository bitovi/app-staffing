import type { NewEmployee, Employee } from "../../services/api";

import { useEffect, useState } from "react";

import { useEmployees } from "../../services/api";
import EmployeeTable from "./components/EmployeeTable";

import styles from "./Employees.module.scss";

import { ReactComponent as BellSVG } from "./assets/vectors/bell.svg";
import { ReactComponent as GearSVG } from "./assets/vectors/gear.svg";
import { Button } from "../../components/Layout/components/Button";

export default function Employees(): JSX.Element {
  const { data: employees, addEmployee, updateEmployee } = useEmployees();

  const [filterValue, setFilterValue] = useState<string>();
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [idBeingEdited, setIdBeingEdited] = useState<string>();

  const handleEditSave = async (employee: Employee) => {
    await updateEmployee(employee); // @TODO: add a loading spinner to save button
    setIdBeingEdited(undefined);
  };

  const handleEditCancel = () => {
    // eslint-disable-next-line no-console
    console.log("CANCELING!");
    setIdBeingEdited(undefined);
  };

  const handleAddSave = async (employee: NewEmployee) => {
    await addEmployee(employee); // @TODO: add a loading spinner to save button
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
          <Button
            title="Notifications"
            variant="link"
            onClick={() => {
              alert("NOTIFICATIONS");
            }}
          >
            <BellSVG className={styles.icon} />
          </Button>
          <Button
            title="Settings"
            variant="link"
            onClick={() => {
              alert("SETTINGS");
            }}
          >
            <GearSVG className={styles.icon} />
          </Button>
        </div>
      </div>
      <div className={styles.row}>
        <Button
          variant="link"
          onClick={() => {
            setIsAdding(true);
          }}
        >
          Add Team Member +
        </Button>
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
          onAdd={handleAddSave}
          onEdit={handleEditSave}
          onAddCancel={handleAddCancel}
          onEditCancel={handleEditCancel}
        />
      )}
    </div>
  );
}
