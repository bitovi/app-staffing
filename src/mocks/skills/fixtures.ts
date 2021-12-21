export interface JSONSkill {
  id: string;
  attributes: {
    name: string;
  };
}

export const skills: JSONSkill[] = [
  { id: "100", attributes: { name: "Angular" } },
  { id: "101", attributes: { name: "Design" } },
  { id: "102", attributes: { name: "DevOps" } },
  { id: "103", attributes: { name: "Node" } },
  { id: "104", attributes: { name: "React" } },
  { id: "105", attributes: { name: "UX Designer" } },
  { id: "106", attributes: { name: "UI Designer" } },
  { id: "107", attributes: { name: "Project Management" } },
];
