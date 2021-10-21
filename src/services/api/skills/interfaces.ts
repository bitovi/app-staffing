export const skillListEnum = [
  "Angular",
  "Design",
  "DevOps",
  "Node",
  "React",
  "UX",
] as const;

export type SkillName = typeof skillListEnum[number];

export interface Skill {
  id: string;
  name: SkillName;
}
