import { Employee } from "..";
import type { BaseData } from "../restBuilder";

import restBuilder from "../restBuilder";

export interface Skill extends BaseData {
  id: string;
  name: string;

  employees?: Employee[];
}

export type NewSkill = Partial<Omit<Skill, "id">>;

const { useRestOne, useRestList, useRestMutations } = restBuilder<Skill>(
  "/skills",
  "skills",
  { title: "Skill" },
);

export { useRestList as useSkills, useRestOne as useSkill };

export function useSkillMutations(): {
  createSkill: ReturnType<typeof useRestMutations>["create"];
  updateSkill: ReturnType<typeof useRestMutations>["update"];
  destroySkill: ReturnType<typeof useRestMutations>["destroy"];
} {
  const { create, update, destroy } = useRestMutations();

  return {
    createSkill: create,
    updateSkill: update,
    destroySkill: destroy,
  };
}
