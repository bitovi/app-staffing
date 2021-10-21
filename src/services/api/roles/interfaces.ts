import type { Skill } from "../skills";
import type { AssignedEmployee } from "../employees";

export interface EstimatedDate {
  date?: Date;
  confidence: string;
}

export interface Role {
  id: string;
  skill: Skill;
  startDate: EstimatedDate;
  endDate: EstimatedDate;
  employees: AssignedEmployee[];
}
