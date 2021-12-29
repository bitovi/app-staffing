import type { BaseData } from "../restBuilder/restBuilder";

import restBuilder from "../restBuilder/restBuilder";
import { Assignment } from "../Assignments";
import { Skill } from ".."; 

export interface Employee extends BaseData {
  id: string;
  name?: string;
  startDate?: Date;
  endDate?: Date;

  assignments?: Assignment[];
  skills?: Skill[];
}

export interface EmployeeRecord {
  id: string;
  name?: string;
  start_date?: Date;
  end_date?: Date;
}

export type NewEmployee = Omit<Employee, "id">;

const { useRestOne, useRestList, useRestMutations } = restBuilder<Employee>(
  "/employees",
  "employees",
  { title: "Team Member" },
);

export { useRestList as useEmployees, useRestOne as useEmployee };

export function useEmployeeMutations(): {
  createEmployee: (employee: NewEmployee) => Promise<string | undefined>;
  updateEmployee: (id: string, employee: Employee) => Promise<void>;
  destroyEmployee: (id: string) => Promise<void>;
} {
  const { create, update, destroy } = useRestMutations();

  return {
    createEmployee: create,
    updateEmployee: update,
    destroyEmployee: destroy,
  };
}
