import type { BaseData } from "../restBuilder";

import restBuilder from "../restBuilder";
import { Assignment } from "../Assignments";
import { Skill } from "../Skills";

export interface Employee extends BaseData {
  id: string;
  name: string;
  startDate?: Date;
  endDate?: Date;

  assignments: Assignment[];
  skills: Skill[];
}

export type NewEmployee = Partial<Omit<Employee, "id">>;

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
