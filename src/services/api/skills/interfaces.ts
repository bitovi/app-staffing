export const skillList = [
  "Angular",
  "Design",
  "DevOps",
  "Node",
  "React",
  "UX",
] as const;

export type SkillName = typeof skillList[number];

export interface Skill {
  id: string;
  name?: SkillName;
}

export interface JSONAPISkill {
  type: string,
  id: string,
  attributes: {
    name?: SkillName
  }
}
