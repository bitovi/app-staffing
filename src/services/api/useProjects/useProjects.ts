import type { Project, NewProject } from "../projects";
import type { ResponseStatus, QueriableList } from "../shared";

import useRest from "../useRest";

interface ProjectActions {
  projects?: Project[];
  addProject: (project: NewProject) => Promise<string>;
  updateProject: (
    projectId: string,
    project: Partial<Project>,
  ) => Promise<void>;
}

/** Hook for getting a list of the projects */
export default function useProjects(
  queryParams?: QueriableList<Project>,
): ResponseStatus & ProjectActions {
  const {
    data: projects,
    error,
    isLoading,
    useAdd,
    useUpdate,
  } = useRest<Project>("/api/v1/projects", queryParams);

  return {
    projects,
    isLoading,
    error,
    addProject: useAdd,
    updateProject: useUpdate,
  };
}
