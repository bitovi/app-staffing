import type { BaseData } from "../restBuilder/restBuilder";

import restBuilder from "../restBuilder/restBuilder";

export interface Skill extends BaseData {
  id: string;
  name: string;
}

export interface EmployeeSkillTable {
  id: string;
  skill_id: string;
  employee_id: string;
}

export type NewSkill = Omit<Skill, "id">;

export enum SkillColors {
  Design = "#435BAE",
  UX = "#AE436A",
  Angular = "#876363",
  React = "#61D0D7",
  Node = "#805AD5",
  DevOps = "#5FAE43",
  "UI Designer" = "#435BAE",
  "UX Designer" = "#AE436A",
  "Project Management" = "#B55F10",
}

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
