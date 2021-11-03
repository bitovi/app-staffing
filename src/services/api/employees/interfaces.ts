import { Skill } from "../skills";

export interface Employee {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  skills: Skill[];
}

export interface EmployeeTable {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
}

export type NewEmployee = Omit<Employee, "id">;

export interface AssignedEmployee {
  startDate?: Date;
  endDate?: Date;
  employee: Employee;
}

export interface JSONAPIEmployee {
  type: string;
  id: string;
  attributes: {
    name: string;
    startDate: Date;
    endDate?: Date;
  };
  relationships: {
    skills: {
      data: {
        type: string;
        id: string;
      }[];
    };
  };
}
