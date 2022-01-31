import type { BaseData } from "../restBuilder";

import restBuilder from "../restBuilder";
import { Role } from "../Roles";

export interface Project extends BaseData {
  id: string;
  name: string;
  description?: string;
  
  roles?: Role[];
}

export type NewProject = Partial<Omit<Project, "id">>;

const { useRestOne, useRestList, useRestMutations } = restBuilder<Project>(
  "/projects",
  "projects",
  { title: "Project" },
);

export { useRestList as useProjects, useRestOne as useProject };

export function useProjectMutations(): {
  createProject: ReturnType<typeof useRestMutations>["create"];
  updateProject: ReturnType<typeof useRestMutations>["update"];
  destroyProject: ReturnType<typeof useRestMutations>["destroy"];
} {
  const { create, update, destroy } = useRestMutations();

  return {
    createProject: create,
    updateProject: update,
    destroyProject: destroy,
  };
}
