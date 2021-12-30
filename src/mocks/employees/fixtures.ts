import faker from "faker";

import { skills } from "../skills/fixtures";

export interface JSONEmployee {
  type: "employees";
  id: string;
  attributes: {
    name: string;
    start_date?: Date;
    end_date?: Date;
  };
  relationships: {
    assignments: {
      data: Array<{ type: "assignments"; id: string }>;
    };
    skills: {
      data: Array<{ type: "skills"; id: string }>;
    };
  };
}

faker.seed(0);

let employeeId = 0;

export function makeEmployee(): JSONEmployee {
  return {
    type: "employees",
    id: `${++employeeId}`,
    attributes: {
      name: faker.name.findName(),
      start_date: faker.date.past(),
      end_date: faker.date.future(),
    },
    relationships: {
      assignments: {
        data: [{ type: "assignments", id: "" }],
      },
      skills: {
        data: faker.random
          .arrayElements(skills, faker.datatype.number({ min: 1, max: 3 }))
          .map(({ id }) => ({ type: "skills", id })),
      },
    },
  };
}

export const employees: JSONEmployee[] = [
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
];
