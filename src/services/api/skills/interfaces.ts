import { JSONData } from "../baseMocks/interfaces";

export interface Skill {
  id: string;
  name?: string;
}

export interface SkillAttributes {
  name?: string;
}

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

export type JSONSkill = JSONData<"skills", SkillAttributes, null>;
