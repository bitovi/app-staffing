import { JSONData } from "../baseMocks/interfaces";
import { JSONSkill } from "../skills/interfaces";

export interface EmployeeRecord {
  id: string;
  name: string;
  start_date?: Date;
  end_date?: Date;
}

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
