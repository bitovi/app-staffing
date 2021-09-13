import type { Project } from "..";
import type { ResponseStatus, NewProject } from "../shared";

import useRest from "../useRest";

interface ProjectActions {
  projects?: Project[];
  addProject: (project: NewProject) => Promise<string>;
  updateProject: (project: Project) => Promise<void>;
}

/** Hook for getting a list of the projects */
export default function useProjects(): ResponseStatus & ProjectActions {
  const {
    data: projects,
    error,
    isLoading,
    useAdd,
    useUpdate,
  } = useRest<Project>("/v1/projects");

  return {
    projects,
    isLoading,
    error,
    addProject: useAdd,
    updateProject: useUpdate,
  };
}
