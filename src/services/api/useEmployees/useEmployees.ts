import type { Employee } from "..";
import type { APIResponse } from "../shared";

import useSWR from "swr";

import { fetcher } from "../shared";

/** Hook for getting a list of the employees */
export default function useEmployees(): APIResponse<Employee[]> {
  const { data: response, error } = useSWR<{ data: Employee[] }, Error>(
    `/v1`,
    fetcher,
  );

  return {
    data: response?.data,
    isLoading: !response && !error,
    error,
  };
}
