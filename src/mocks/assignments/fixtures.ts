import type { JSONEmployee, JSONRole } from "../fixtures";

import faker from "faker";

export interface JSONAssignment {
  type: "assignments";
  id: string;
  attributes: {
    start_date?: Date;
    end_date?: Date;
  };
  relationships: {
    employee: {
      data: { type: "employees"; id: string };
    };
    role: {
      data: { type: "roles"; id: string };
    };
  };
}

const fakerSeedBase = 4000;
let assignmentId = 4000;

export function makeAssignment(
  employee: JSONEmployee,
  role: JSONRole,
): JSONAssignment {
  faker.seed(fakerSeedBase + assignmentId);

  return {
    type: "assignments",
    id: `${++assignmentId}`,
    attributes: {
      start_date: faker.date.past(),
      end_date: faker.date.future(),
    },
    relationships: {
      employee: {
        data: {
          type: employee.type,
          id: employee.id,
        },
      },
      role: {
        data: {
          type: role.type,
          id: role.id,
        },
      },
    },
  };
}

export const assignments: JSONAssignment[] = [];

export function addAssignment(
  employee: JSONEmployee,
  role: JSONRole,
): JSONAssignment {
  const assignment = makeAssignment(employee, role);

  employee.relationships.assignments.data.push({
    type: assignment.type,
    id: assignment.id,
  });

  role.relationships.assignments.data.push({
    type: assignment.type,
    id: assignment.id,
  });

  assignments.push(assignment);

  return assignment;
}
