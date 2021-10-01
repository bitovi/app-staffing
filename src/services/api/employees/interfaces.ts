import { Skill } from "../shared";

export interface Employee {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  skills: Skill[];
}

export type NewEmployee = Omit<Employee, "id">;

export interface AssignedEmployee extends Employee {
  assignmentStartDate?: string;
  assignmnetEndDate?: string;
}
