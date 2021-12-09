import { JSONData } from "../baseMocks/interfaces";
import { Skill } from "../skills";
import { JSONSkill } from "../skills/interfaces";

export interface Employee {
  id: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  skills: Skill[];
}

export interface EmployeeTable {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
}

export type NewEmployee = Omit<Employee, "id">;

export interface AssignedEmployee {
  startDate?: Date;
  endDate?: Date;
  employee: Employee;
}

export interface EmployeeAttributes {
  name: string;
  startDate?: string;
  endDate?: string;
}

export interface EmployeeRelationships {
  skills: {
    data: Omit<JSONSkill, "attributes">[];
  };
}

export type EmployeeJSON = JSONData<
  "employees",
  EmployeeAttributes,
  EmployeeRelationships
>;
