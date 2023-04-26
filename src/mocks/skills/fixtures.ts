export interface JSONSkill {
  type: "Skill";
  id: string;
  attributes: {
    name: string;
  };
}

export const skills: JSONSkill[] = [
  { type: "Skill", id: "1001", attributes: { name: "Angular" } },
  { type: "Skill", id: "1002", attributes: { name: "React" } },
  { type: "Skill", id: "1003", attributes: { name: "DevOps" } },
  { type: "Skill", id: "1004", attributes: { name: "Node" } },
  { type: "Skill", id: "1005", attributes: { name: "Product" } },
  { type: "Skill", id: "1006", attributes: { name: "Project Management" } },
];
