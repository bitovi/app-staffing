import type { Employee } from "..";
import type { APIRead } from "../shared";

import useSWR, { mutate } from "swr";

import { fetcher } from "../shared";

/** Hook for getting a list of the employees */
export default function useEmployees(): APIRead<Employee[]> {
  const { data: response, error } = useSWR<{ data: Employee[] }, Error>(
    `/v1`,
    fetcher,
  );

  return {
    data: response?.data,
    isLoading: !response && !error,
    error,
    refresh: () => {
      mutate("/v1");
    },
  };
}
