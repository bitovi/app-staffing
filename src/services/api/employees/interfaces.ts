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

//////////////////////////////////////////////////////////////////
//** This interface for Typing frontend Employee sent through POST
//**  Note that the date values are strings and not date objects --
//**  This happens in middleware
/////////////////////////////////////////////////////////////////
export interface FrontEndEmployee
  extends Omit<JSONAPIEmployee, "id" | "attributes" | "relationships"> {
  attributes: {
    name: string;
    startDate: string;
    endDate?: string;
  };
  relationships: {
    skills: {
      data?: {
        type: string;
        id: string;
      }[];
    };
  };
}
