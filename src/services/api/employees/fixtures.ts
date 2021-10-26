import type { Skill } from "../common";
import type { Employee } from "./interfaces";

import faker from "faker";

import { skillList } from "../common";

faker.seed(0);

let employeeId = 0;
export function makeEmployee(employee?: Partial<Employee>): Employee {
  const startDate = faker.date.past();

  const skills: Skill[] = faker.random
    .arrayElements(skillList, faker.datatype.number(3) + 1)
    .map((name) => ({ name }));

  return {
    id: `${++employeeId}`,
    name: faker.name.findName(),
    startDate: startDate,
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
