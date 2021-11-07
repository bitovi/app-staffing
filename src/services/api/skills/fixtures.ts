import { Skill } from ".";

let skillId = 100;

export const skills: Array<Skill> = [
  { id: `${++skillId}`, name: "UX Designer" },
  { id: `${++skillId}`, name: "React" },
  { id: `${++skillId}`, name: "Node" },
  { id: `${++skillId}`, name: "Angular" },
  { id: `${++skillId}`, name: "UI Designer" },
  { id: `${++skillId}`, name: "Project Management" },
  { id: `${++skillId}`, name: "DevOps" },
];
