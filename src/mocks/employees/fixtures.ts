import faker from "faker";

import { projects } from "../projects/fixtures";
import { skills } from "../skills/fixtures";

import { addAssignment } from "../assignments/fixtures";
import { addRole } from "../roles/fixtures";

export interface JSONEmployee {
  type: "Employee";
  id: string;
  attributes: {
    name: string;
    start_date?: Date;
    end_date: Date | null;
  };
  relationships: {
    assignments?: {
      data: Array<{ type: "Assignment"; id: string }>;
    };
    skills?: {
      data: Array<{ type: "Skill"; id: string }>;
    };
  };
}

const fakerSeedBase = 1000;
let employeeId = 1000;

export function makeEmployee(): JSONEmployee {
  faker.seed(fakerSeedBase + employeeId);

  return {
    type: "Employee",
    id: `${++employeeId}`,
    attributes: {
      name: faker.name.findName(),
      start_date: faker.date.past(),
      end_date: faker.random.arrayElement([
        faker.date.past(),
        null,
        faker.date.future(),
      ]),
    },
    relationships: {
      assignments: {
        data: [],
      },
      skills: {
        data: faker.random
          .arrayElements(skills, faker.datatype.number({ min: 1, max: 3 }))
          .map(({ id }) => ({ type: "Skill", id })),
      },
    },
  };
}

export const employees: JSONEmployee[] = [];

export function addEmployee(): void {
  faker.seed(fakerSeedBase + employeeId);

  const employee = makeEmployee();
  const project = faker.random.arrayElement(projects);

  const role = addRole(project);
  addAssignment(employee, role);

  employees.push(employee);
}

for (let i = 0; i < 15; i++) {
  addEmployee();
}
