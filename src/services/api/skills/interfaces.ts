import { JSONData } from "../baseMocks/interfaces";

export interface Skill {
  id: string;
  name?: string;
}

export interface SkillAttributes {
  name?: string;
}

export type JSONSkill = JSONData<"skills", SkillAttributes, null>;
