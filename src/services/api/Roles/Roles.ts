import type { BaseData } from "../restBuilder";

import restBuilder from "../restBuilder";
import { Assignment } from "../Assignments";
import { Project } from "../Projects";
import { Skill } from "../Skills";

export interface Role extends BaseData {
  id: string;
  startDate: Date | string;
  startConfidence: number;
  endDate?: Date | string | null;
  endConfidence?: number;
  assignments?: Assignment[];
  project: Project;
  skills: Skill[];
  // needed for filter[project_id][$eq]
  project_id?: string;
}

export type NewRole = Partial<Omit<Role, "id">>;

const parentStore = { path: "/projects", sourceRelationship: "project" };

const { useRestOne, useRestList, useRestMutations } = restBuilder<Role>(
  "/roles",
  "roles",
  { title: "Role" },
  parentStore,
);

export { useRestList as useRoles, useRestOne as useRole };

export function useRoleMutations(): {
  createRole: ReturnType<typeof useRestMutations>["create"];
  updateRole: ReturnType<typeof useRestMutations>["update"];
  destroyRole: ReturnType<typeof useRestMutations>["destroy"];
} {
  const { create, update, destroy } = useRestMutations();

  return {
    createRole: create,
    updateRole: update,
    destroyRole: destroy,
  };
}
