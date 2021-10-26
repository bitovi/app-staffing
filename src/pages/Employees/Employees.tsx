import { Suspense, useCallback, useState } from "react";
import type { Employee } from "../../services/api";
import { useEmployees as useEmployeesDefault } from "../../services/api";
import EmployeeTable from "./components/EmployeeTable";
import { EmployeeCardSkeleton } from "./components/EmployeeCard/EmployeeCard";

import styles from "./Employees.module.scss";

import Button from "../../components/Button";

export function EmployeePageLoadingLayout(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.actionBar}>
        <div className={styles.actionBarTitle}>Team</div>
        <div className={styles.actionBarActions} />
      </div>

      <div className={styles.row}>
        <Button
          variant="link"
          disabled={true}
          onClick={() => {
            null;
          }}
        >
          Add Team Member +
        </Button>
      </div>
      <EmployeeCardSkeleton />
    </div>
  );
}

export default function EmployeesWrapper(): JSX.Element {
  return (
    <Suspense fallback={<EmployeePageLoadingLayout />}>
      <Employees useEmployees={useEmployeesDefault} />
    </Suspense>
  );
}

export function Employees({
  useEmployees,
}: {
  useEmployees: typeof useEmployeesDefault;
}): JSX.Element {
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

      <Suspense fallback={<EmployeeCardSkeleton />}>
        <EmployeeTable
          filterValue={filterValue}
          filteredEmployees={filteredEmployees}
          onEdit={handleEditSave}
        />
      </Suspense>
    </div>
  );
}
