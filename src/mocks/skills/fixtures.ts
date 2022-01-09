export interface JSONSkill {
  type: "skills";
  id: string;
  attributes: {
    name: string;
  };
}

export const skills: JSONSkill[] = [
  { type: "skills", id: "1001", attributes: { name: "Angular" } },
  { type: "skills", id: "1002", attributes: { name: "React" } },
  { type: "skills", id: "1003", attributes: { name: "DevOps" } },
  { type: "skills", id: "1004", attributes: { name: "Node" } },
  { type: "skills", id: "1005", attributes: { name: "Product" } },
  { type: "skills", id: "1006", attributes: { name: "Project Management" } },
];
