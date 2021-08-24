import useSWR from "swr";
import { Employee } from "../../services/api";

// The response of the `useEmployees` hook
interface EmployeesResponse {
  // List of employees
  employees: Employee[];

  // Whether or not the call is in progress
  isLoading: boolean;

  // The error of the call if there is one
  error?: Error;
}

/**
 * Fetcher function for the `useSWR` hook.
 *
 * @param url The url to fetch
 * @returns The json formatted response
 */
const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Hook for getting a list of the employees
 *
 * @returns A list of `Employee` objects
 */
export function useEmployees(): EmployeesResponse {
  const { data: response, error } = useSWR(`/v1`, fetcher);

  return {
    employees: response?.data,
    isLoading: !response && !error,
    error,
  };
}
