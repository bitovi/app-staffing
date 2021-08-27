import type { Project } from "..";
import type { APIResponse } from "../shared";

import useSWR from "swr";

import { fetcher } from "../shared";

/** Hook for getting a list of the employees */
export default function useProjects(): APIResponse<Project[]> {
  const { data: response, error } = useSWR<{ data: Project[] }, Error>(
    "/v1/projects",
    fetcher,
  );

  return {
    data: response?.data,
    isLoading: !response && !error,
    error,
  };
}
