import type { NewEmployee, Employee, Skill } from "..";
import type { ResponseStatus, QueriableList } from "../shared";

import { useCallback } from "react";

import useRest from "../useRest";

interface EmployeeActions {
  employees?: Employee[];
  addEmployee: (employee: NewEmployee) => Promise<string>;
  updateEmployee: (
    employeeId: string,
    employee: Partial<Employee>,
  ) => Promise<void>;
  getEmployeesWithSkill: (skill: Skill) => Employee[];
}

/** Hook for getting a list of the employees */
export default function useEmployees(
  queryParams?: QueriableList<Employee>,
): ResponseStatus & EmployeeActions {
  const {
    data: employees,
    error,
    isLoading,
    useAdd,
    useUpdate,
  } = useRest<Employee>("/api/v1/employees", queryParams);

  const getEmployeesWithSkill = useCallback(
    (_skill: Skill): Employee[] => {
      if (!employees) {
        return [];
      }

      return employees.filter(({ skills }) =>
        skills.map(({ name }) => name).includes(_skill.name),
      );
    },
    [employees],
  );

  return {
    employees,
    isLoading,
    error,
    addEmployee: useAdd,
    updateEmployee: useUpdate,
    getEmployeesWithSkill,
  };
}
