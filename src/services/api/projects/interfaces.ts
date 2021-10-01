import type { AssignedEmployee } from "../employees";
import type { Skill } from "../shared";

export interface Role {
  id: string;
  skill: Skill;
  startDate: EstimatedDate;
  endDate: EstimatedDate;
  employees: AssignedEmployee[];
}

export interface EstimatedDate {
  date: Date;
  confidence: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  roles: Role[];
}

export type NewProject = Omit<Project, "id">;
