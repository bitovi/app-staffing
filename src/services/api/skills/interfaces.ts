export interface Skill {
  id: string;
  name?: string;
}
export interface JSONAPISkill {
  type: string;
  id: string;
  attributes: {
    name?: string;
  };
}
