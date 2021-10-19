import type { Employee } from "../../services/api";

import { useCallback, useState } from "react";

import { useEmployees } from "../../services/api";
import EmployeeTable from "./components/EmployeeTable";

import styles from "./Employees.module.scss";

import Button from "../../components/Button";

export default function Employees(): JSX.Element {
  const { employees, addEmployee, updateEmployee } = useEmployees();

  const [filterValue, setFilterValue] = useState<string>();

  const handleEditSave = useCallback(
    async (id: string, employee: Employee) => {
      employee.name && (await updateEmployee(id, employee)); // @TODO: add a loading spinner to save button
    },
    [updateEmployee],
  );

  const handleAddEmployee = async () => {
    await addEmployee({
      name: "",
      startDate: new Date(),
      skills: [],
    }); // @TODO: add a loading spinner to save button
  };

  const filteredEmployees = filterValue
    ? employees?.filter((e) =>
        e.name.toLowerCase().includes(filterValue.toLowerCase()),
      )
    : employees;

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
        </div>
      </div>
      <div className={styles.row}>
        <Button
          variant="link"
          onClick={() => {
            handleAddEmployee();
          }}
        >
          Add Team Member +
        </Button>
      </div>
      {!employees && <div className={styles.noResults}>LOADING...</div>}
      {employees && employees.length === 0 && (
        <div className={styles.noResults}>NO DATA FOUND!</div>
      )}
      {filteredEmployees?.length && (
        <EmployeeTable
          filterValue={filterValue}
          filteredEmployees={filteredEmployees}
          onEdit={handleEditSave}
        />
      )}
    </div>
  );
}
