import type { Employee } from "..";
import type { APIResponse } from "../shared";

import useSWR, { mutate } from "swr";
import { useCallback } from "react";

import { fetcher } from "../shared";

interface EmployeeActions {
  refresh?: () => void;
  addEmployee: (employee: Employee) => Promise<void>;
  updateEmployee: (employee: Employee) => Promise<void>;
}

const employeePath = "/v1";

/** Hook for getting a list of the employees */
export default function useEmployees(): APIResponse<Employee[]> &
  EmployeeActions {
  const { data: response, error } = useSWR<{ data: Employee[] }, Error>(
    employeePath,
    fetcher,
  );

  const addEmployee = useCallback(
    async (employee: Employee) => {
      if (!response) return;

      await fetch(employeePath, {
        method: "POST",
        body: JSON.stringify(employee),
      })
        .then((res) => res.json())
        .then((newEmployee) =>
          mutate(
            employeePath,
            { ...response, data: [...response?.data, newEmployee] },
            false,
          ),
        );
      // @TODO: handle errors from POST call and display appropriate message
    },
    [response],
  );

  const updateEmployee = useCallback(
    async (employee: Employee) => {
      if (!response) return;

      await fetch(employeePath, {
        method: "PUT",
        body: JSON.stringify(employee),
      })
        .then((res) => res.json())
        .then((updatedEmployee) =>
          mutate(
            employeePath,
            {
              ...response,
              data: response?.data.map((x) =>
                x.id === updatedEmployee.id ? updatedEmployee : x,
              ),
            },
            false,
          ),
        );
      // @TODO: handle errors from PUT call and display appropriate message
    },
    [response],
  );

  return {
    data: response?.data,
    isLoading: !response && !error,
    error,
    addEmployee,
    updateEmployee,
  };
}
