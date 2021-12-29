import type { BaseData } from "../restBuilder/restBuilder";

import restBuilder from "../restBuilder/restBuilder";
import { Assignment } from "../Assignments";
import { Project } from "../Projects";
import { Skill } from "../Skills";

export interface Role extends BaseData {
  id: string;
  startDate?: Date;
  startConfidence?: number;
  endDate?: Date;
  endConfidence?: number;

  assignments?: Assignment[];
  project: Project;
  skills?: Skill[];
}

export type NewRole = Omit<Role, "id">;

const { useRestOne, useRestList, useRestMutations } = restBuilder<Role>(
  "/roles",
  "roles",
  { title: "Team Member" },
);

export { useRestList as useRoles, useRestOne as useRole };

export function useRoleMutations(): {
  createRole: (role: NewRole) => Promise<string | undefined>;
  updateRole: (id: string, role: Role) => Promise<void>;
  destroyRole: (id: string) => Promise<void>;
} {
  const { create, update, destroy } = useRestMutations();

  return {
    createRole: create,
    updateRole: update,
    destroyRole: destroy,
  };
}
