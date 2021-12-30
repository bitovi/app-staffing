import type { BaseData } from "../restBuilder/restBuilder";

import restBuilder from "../restBuilder/restBuilder";
import { Role } from "../Roles";

export interface Project extends BaseData {
  id: string;
  name: string;
  description?: string;

  roles: Role[];
}

export type NewProject = Partial<Omit<Project, "id">>;

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
