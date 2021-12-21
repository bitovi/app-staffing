import type { QueriableList, ResponseStatus } from "../restBuilder/shared";
import type { NewProject, Project } from "../mocks/projects";
import useRest from "../restBuilder";

interface ProjectActions {
  projects?: Project[];
  addProject: (project: NewProject) => Promise<string>;
  updateProject: (
    projectId: string,
    project: Partial<Project>,
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  reset: () => void;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
    reset,
  } = useRest<Project>(`${API_BASE_URL}/projects`, "undefined", queryParams);

  return {
    projects,
    isLoading,
    error,
    addProject: handleAdd,
    updateProject: handleUpdate,
    deleteProject: handleDelete,
    reset,
  };
}
