import type { Employee } from "..";
import type { APIResponse } from "../shared";

import useSWR, { mutate } from "swr";
import { useCallback } from "react";

import { fetcher } from "../shared";

interface EmployeeActions {
  refresh?: () => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
}

/** Hook for getting a list of the employees */
export default function useEmployees(): APIResponse<Employee[]> &
  EmployeeActions {
  const employeePath = "/v1";

  const { data: response, error } = useSWR<{ data: Employee[] }, Error>(
    employeePath,
    fetcher,
  );

  const refresh = useCallback(() => {
    mutate(employeePath);
  }, []);

  const addEmployee = useCallback(
    async (employee: Employee) => {
      if (!response) return;

      mutate(
        employeePath,
        { ...response, data: [...response?.data, employee] },
        false,
      ); // add locally

      await fetch(employeePath, {
        method: "POST",
        body: JSON.stringify(employee),
      });

      refresh(); // revalidate data
    },
    [refresh, response],
  );

  const updateEmployee = useCallback(
    async (employee: Employee) => {
      if (!response) return;

      mutate(
        employeePath,
        { ...response, data: response?.data
          .map( x => x.id === employee.id ? employee : x) },
        false,
      ); // add locally

      await fetch(employeePath, {
        method: "PUT",
        body: JSON.stringify(employee),
      });

      refresh(); // revalidate data
    },
    [refresh, response],
  );

  return {
    data: response?.data,
    isLoading: !response && !error,
    error,
    refresh,
    addEmployee,
    updateEmployee
  };
}
