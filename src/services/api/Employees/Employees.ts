import type { BaseData } from "../restBuilder";

import restBuilder from "../restBuilder";
import { Assignment } from "../Assignments";
import { Skill } from "../Skills";

export interface Employee extends BaseData {
  id: string;
  name: string;
  startDate?: Date | string | null;
  endDate?: Date | string | null;

  assignments?: Assignment[];
  skills: Skill[];
}

const { useRestOne, useRestList, useRestMutations } = restBuilder<Employee>(
  "/employees",
  "employees",
  { title: "Team Member" },
);

export { useRestList as useEmployees, useRestOne as useEmployee };

export function useEmployeeMutations(): {
  createEmployee: ReturnType<typeof useRestMutations>["create"];
  updateEmployee: ReturnType<typeof useRestMutations>["update"];
  destroyEmployee: ReturnType<typeof useRestMutations>["destroy"];
} {
  const { create, update, destroy } = useRestMutations();

  return {
    createEmployee: create,
    updateEmployee: update,
    destroyEmployee: destroy,
  };
}
