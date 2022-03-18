import type { BaseData } from "../restBuilder";

import restBuilder from "../restBuilder";
import { Employee } from "../Employees";
import { Role } from "../Roles";

export interface Assignment extends BaseData {
  id: string;
  startDate: Date;
  endDate?: Date;

  employee: Employee;
  role: Role;
}

export type NewAssignment = Partial<Omit<Assignment, "id">>;

const { useRestOne, useRestList, useRestMutations } = restBuilder<Assignment>(
  "/assignments",
  "assignments",
  { title: "Assignment" },
);

export { useRestList as useAssignments, useRestOne as useAssignment };

export function useAssignmentMutations(): {
  createAssignment: ReturnType<typeof useRestMutations>["create"];
  updateAssignment: ReturnType<typeof useRestMutations>["update"];
  destroyAssignment: ReturnType<typeof useRestMutations>["destroy"];
} {
  const { create, update, destroy } = useRestMutations();

  return {
    createAssignment: create,
    updateAssignment: update,
    destroyAssignment: destroy,
  };
}
