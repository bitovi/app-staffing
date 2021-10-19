import type { Employee, NewEmployee } from "..";
import type { ResponseStatus, QueriableList } from "../shared";

import useRest from "../useRest";

interface EmployeeActions {
  employees?: Employee[];
  addEmployee: (employee: NewEmployee) => Promise<string>;
  updateEmployee: (
    employeeId: string,
    employee: Partial<Employee>,
  ) => Promise<void>;
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
  } = useRest<Employee>("/api/v1/employees", queryParams);

  return {
    employees,
    isLoading,
    error,
    addEmployee: handleAdd,
    updateEmployee: handleUpdate,
  };
}
