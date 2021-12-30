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

faker.seed(0);

let assignmentId = 0;

export function makeAssignment(): JSONAssignment {
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
          type: "employees",
          id: "",
        },
      },
      role: {
        data: {
          type: "roles",
          id: "",
        },
      },
    },
  };
}

export const assignments: JSONAssignment[] = [
  makeAssignment(),
  makeAssignment(),
  makeAssignment(),
  makeAssignment(),
  makeAssignment(),
];
