import type { NewEmployee, Employee, Skill } from "..";
import type { APIResponse } from "../shared";

import useSWR, { mutate } from "swr";
import { useCallback } from "react";

import { fetcher } from "../shared";
import { employees } from "../fixtures";

interface EmployeeActions {
  addEmployee: (employee: NewEmployee) => Promise<void>;
  updateEmployee: (employee: Employee) => Promise<void>;
  getEmployeesWithSkill: (skill: Skill) => Employee[];
}

const employeePath = "/v1";

/** Hook for getting a list of the employees */
export default function useEmployees(): APIResponse<Employee[]> &
  EmployeeActions {
  const { data: response, error } = useSWR<{ data: Employee[] }, Error>(
    employeePath,
    fetcher,
  );

  const addEmployee = useCallback(async (employee: NewEmployee) => {
    await mutate(
      employeePath,
      async (employeeResponse: { data: Employee[] }) => {
        const { data: id } = await fetch(employeePath, {
          method: "POST",
          body: JSON.stringify(employee),
        }).then((res) => res.json());

        return {
          ...employeeResponse,
          data: [...employeeResponse.data, { ...employee, id }],
        };
      },
    );
  }, []);

  const updateEmployee = useCallback(async (employee: Employee) => {
    await mutate(
      employeePath,
      async (employeeResponse: { data: Employee[] }) => {
        await fetch(employeePath, {
          method: "PUT",
          body: JSON.stringify(employee),
        });

        return {
          ...employeeResponse,
          data: employeeResponse.data.map((x) =>
            x.id === employee.id ? employee : x,
          ),
        };
      },
    );
  }, []);

  const getEmployeesWithSkill = useCallback((_skill: Skill): Employee[] => {
    return employees.filter(({ skills }) =>
      skills.map(({ name }) => name).includes(_skill.name),
    );
  }, []);

  return {
    data: response?.data,
    isLoading: !response && !error,
    error,
    addEmployee,
    updateEmployee,
    getEmployeesWithSkill,
  };
}
