import type { Skill } from "../shared";
import type { Employee } from "./interfaces";

import faker from "faker";

import { skillList } from "../shared";

faker.seed(0);

let id = 0;
export function makeEmployee(employee?: Partial<Employee>): Employee {
  const startDate = faker.date.past();

  const skills: Skill[] = faker.random
    .arrayElements(skillList, faker.datatype.number(3) + 1)
    .map((name) => ({ name }));

  return {
    id: `${++id}`,
    name: faker.name.findName(),
    startDate: startDate.toISOString(),
    skills,

    ...employee,
  };
}

export const employees: Employee[] = [
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
];