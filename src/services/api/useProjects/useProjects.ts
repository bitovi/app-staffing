import type { Project, NewProject } from "../projects";
import type { ResponseStatus, QueriableList } from "../shared";

import { mapProject } from "../projects";

import useRest from "../useRest";

interface ProjectActions {
  projects?: Project[];
  addProject: (project: NewProject) => Promise<string>;
  updateProject: (
    projectId: string,
    project: Partial<Project>,
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
}

/** Hook for getting a list of the projects */
export default function useProjects(
  queryParams?: QueriableList<Project>,
): ResponseStatus & ProjectActions {
  const {
    data: projects,
    error,
    isLoading,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useRest<Project>("/api/v1/projects", queryParams, mapProject);

  return {
    projects,
    isLoading,
    error,
    addProject: handleAdd,
    updateProject: handleUpdate,
    deleteProject: handleDelete,
  };
}
