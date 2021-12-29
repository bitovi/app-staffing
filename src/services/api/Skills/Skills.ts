import type { BaseData } from "../restBuilder/restBuilder";

import restBuilder from "../restBuilder/restBuilder";

export interface Skill extends BaseData {
  id: string;
  name: string;
}

export type NewSkill = Omit<Skill, "id">;

const { useRestOne, useRestList, useRestMutations } = restBuilder<Skill>(
  "/skills",
  "skills",
  { title: "Team Member" },
);

export { useRestList as useSkills, useRestOne as useSkill };

export function useSkillMutations(): {
  createSkill: (skill: NewSkill) => Promise<string | undefined>;
  updateSkill: (id: string, skill: Skill) => Promise<void>;
  destroySkill: (id: string) => Promise<void>;
} {
  const { create, update, destroy } = useRestMutations();

  return {
    createSkill: create,
    updateSkill: update,
    destroySkill: destroy,
  };
}
