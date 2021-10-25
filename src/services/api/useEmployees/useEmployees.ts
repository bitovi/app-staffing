import type { Employee, NewEmployee } from "../employees";
import type { ResponseStatus, QueriableList } from "../common";

import { mapEmployee } from "../employees";

import useRest from "../useRest";

interface EmployeeActions {
  employees?: Employee[];
  addEmployee: (employee: NewEmployee) => Promise<string>;
  updateEmployee: (
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
    handleUpdate,
    handleDelete,
    reset,
  } = useRest<Employee>("/api/v1/employees", queryParams, mapEmployee);

  return {
    employees,
    isLoading,
    error,
    addEmployee: handleAdd,
    updateEmployee: handleUpdate,
    deleteEmployee: handleDelete,
    reset,
  };
}
