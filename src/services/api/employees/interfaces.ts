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

export interface EmployeeRecord {
  id: string;
  name: string;
  start_date?: Date;
  end_date?: Date;
}

export type NewEmployee = Omit<Employee, "id">;

export interface AssignedEmployee {
  startDate?: Date;
  endDate?: Date;
  employee: Employee;
}

export interface EmployeeAttributes {
  name: string;
  startDate?: Date;
  endDate?: Date;
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
