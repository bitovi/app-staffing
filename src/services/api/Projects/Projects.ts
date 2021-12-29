import type { BaseData } from "../restBuilder/restBuilder";

import restBuilder from "../restBuilder/restBuilder";

import { Role } from "../Roles/Roles";

export interface Project extends BaseData {
  id: string;
  name: string;
  description?: string;

  roles?: Role[];
}

export interface ProjectRecord {
  id: string;
  name?: string;
  description?: string;
}

export type NewProject = Omit<Project, "id">;

const { useRestOne, useRestList, useRestMutations } = restBuilder<Project>(
  "/projects",
  "projects",
  { title: "Team Member" },
);

export { useRestList as useProjects, useRestOne as useProject };

export function useProjectMutations(): {
  createProject: (project: NewProject) => Promise<string | undefined>;
  updateProject: (id: string, project: Project) => Promise<void>;
  destroyProject: (id: string) => Promise<void>;
} {
  const { create, update, destroy } = useRestMutations();

  return {
    createProject: create,
    updateProject: update,
    destroyProject: destroy,
  };
}
