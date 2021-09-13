import type { Project } from "..";
import type { APIResponse, NewProject } from "../shared";

import useSWR, { mutate } from "swr";
import { useCallback } from "react";

import { fetcher } from "../shared";

interface ProjectActions {
  addProject: (project: NewProject) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
}

const projectPath = "/v1/projects";

/** Hook for getting a list of the projects */
export default function useProjects(): APIResponse<Project[]> & ProjectActions {
  const { data: response, error } = useSWR<{ data: Project[] }, Error>(
    projectPath,
    fetcher,
  );

  const addProject = useCallback(async (project: NewProject) => {
    await mutate(projectPath, async (projectResponse: { data: Project[] }) => {
      const { data: id } = await fetch(projectPath, {
        method: "POST",
        body: JSON.stringify(project),
      }).then((res) => res.json());

      return {
        ...projectResponse,
        data: [...projectResponse.data, { ...project, id }],
      };
    }, false);
  }, []);

  const updateProject = useCallback(async (project: Project) => {
    await mutate(projectPath, async (projectResponse: { data: Project[] }) => {
      await fetch(projectPath, {
        method: "PUT",
        body: JSON.stringify(project),
      });

      return {
        ...projectResponse,
        data: projectResponse.data.map((p) =>
          p.id === project.id ? project : p,
        ),
      };
    }, false);
  }, []);

  return {
    data: response?.data,
    isLoading: !response && !error,
    error,
    addProject,
    updateProject,
  };
}
