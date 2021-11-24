import type { Employee } from "../employees";
import { JSONAPIEmployee } from "../employees/interfaces";
import type { ResponseStatus, QueriableList } from "../shared";

import useRest from "../useRest/useRestV2";

const alphabetizeByName = (array: Employee[] | undefined): Employee[] => {
  if (array) {
    return array.sort((a, b) =>
      a.name.split(" ")[1].localeCompare(b.name.split(" ")[1]),
    );
  }
  return [];
};

export interface EmployeeActions {
  employees?: Employee[] | undefined;
  addEmployee: (employee: {
    data: Omit<JSONAPIEmployee, "id">;
  }) => Promise<string | undefined>;
  updateEmployee?: (
    employeeId: string,
    employee: Partial<Employee>,
  ) => Promise<void>;
  deleteEmployee: (employeeId: string) => Promise<void>;
  reset: () => void;
}

/** Hook for getting a list of the employees */
export default function useEmployees(
  queryParams?: QueriableList<Employee>,
): ResponseStatus & EmployeeActions {
  const {
    data: employees,
    error,
    isLoading,
    handleAdd,
    // handleUpdate,
    handleDelete,
    reset,
    // two interfaces passed to useRest now,
    // the backend data shape of Employees
    // and the frontend data shape of Employees
    // useRest operates as the switchboard between the two.
  } = useRest<Employee, JSONAPIEmployee>(
    "/api/v1/employees",
    "employees",
    queryParams,
  );

  return {
    employees: alphabetizeByName(employees),
    isLoading,
    error,
    addEmployee: handleAdd,
    // updateEmployee: handleUpdate,
    deleteEmployee: handleDelete,
    reset,
  };
}
