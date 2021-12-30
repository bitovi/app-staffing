export interface JSONSkill {
  type: "skills";
  id: string;
  attributes: {
    name: string;
  };
}

export const skills: JSONSkill[] = [
  { type: "skills", id: "100", attributes: { name: "Angular" } },
  { type: "skills", id: "101", attributes: { name: "Design" } },
  { type: "skills", id: "102", attributes: { name: "DevOps" } },
  { type: "skills", id: "103", attributes: { name: "Node" } },
  { type: "skills", id: "104", attributes: { name: "React" } },
  { type: "skills", id: "105", attributes: { name: "UX Designer" } },
  { type: "skills", id: "106", attributes: { name: "UI Designer" } },
  { type: "skills", id: "107", attributes: { name: "Project Management" } },
];
