import { Skill } from "../common";

export interface Employee {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  skills: Skill[];
}

export type NewEmployee = Omit<Employee, "id">;

export interface AssignedEmployee {
  startDate?: Date;
  endDate?: Date;
  employee: Employee;
}

export interface ServerEmployee
  extends Omit<Employee, "startDate" | "endDate"> {
  startDate: string;
  endDate?: string;
}
