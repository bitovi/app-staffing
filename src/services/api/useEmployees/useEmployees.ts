import type { NewEmployee, Employee, Skill } from "..";
import type { APIResponse } from "../shared";

import { useCallback } from "react";

import { employees } from "../fixtures";
import useRest from "../useRest";

interface EmployeeActions {
  addEmployee: (employee: NewEmployee) => Promise<string>;
  updateEmployee: (employee: Employee) => Promise<void>;
  getEmployeesWithSkill: (skill: Skill) => Employee[];
}

/** Hook for getting a list of the employees */
export default function useEmployees(): APIResponse<Employee[]> &
  EmployeeActions {
  const { data, error, isLoading, useAdd, useUpdate } =
    useRest<Employee>("/v1");

  const getEmployeesWithSkill = useCallback((_skill: Skill): Employee[] => {
    return employees.filter(({ skills }) =>
      skills.map(({ name }) => name).includes(_skill.name),
    );
  }, []);

  return {
    data,
    isLoading,
    error,
    addEmployee: useAdd,
    updateEmployee: useUpdate,
    getEmployeesWithSkill,
  };
}
