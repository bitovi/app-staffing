export interface JSONSkill {
  type: "skills";
  id: string;
  attributes: {
    name: string;
  };
}

export const skills: JSONSkill[] = [
  { type: "skills", id: "101", attributes: { name: "Angular" } },
  { type: "skills", id: "102", attributes: { name: "React" } },
  { type: "skills", id: "103", attributes: { name: "DevOps" } },
  { type: "skills", id: "104", attributes: { name: "Node" } },
  { type: "skills", id: "105", attributes: { name: "Product" } },
  { type: "skills", id: "106", attributes: { name: "Project Management" } },
];
