import type { BaseData } from "../restBuilder/restBuilder";

import restBuilder from "../restBuilder/restBuilder";
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
  { title: "Team Member" },
);

export { useRestList as useAssignments, useRestOne as useAssignment };

export function useAssignmentMutations(): {
  createAssignment: (assignment: NewAssignment) => Promise<string | undefined>;
  updateAssignment: (id: string, assignment: Assignment) => Promise<void>;
  destroyAssignment: (id: string) => Promise<void>;
} {
  const { create, update, destroy } = useRestMutations();

  return {
    createAssignment: create,
    updateAssignment: update,
    destroyAssignment: destroy,
  };
}
