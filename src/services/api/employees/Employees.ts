import type { BaseData } from "../restBuilder/restBuilder";

import restBuilder from "../restBuilder/restBuilder";
import { Skill } from "../mocks/skills/interfaces";

export interface Employee extends BaseData {
  id: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  skills: Skill[];
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
