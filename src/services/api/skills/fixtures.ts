import { Skill } from ".";

let skillId = 100;

export const skills: Array<Skill> = [
  { id: `${++skillId}`, name: "Angular" },
  { id: `${++skillId}`, name: "Design" },
  { id: `${++skillId}`, name: "DevOps" },
  { id: `${++skillId}`, name: "Node" },
  { id: `${++skillId}`, name: "React" },
  { id: `${++skillId}`, name: "UX" },
];
