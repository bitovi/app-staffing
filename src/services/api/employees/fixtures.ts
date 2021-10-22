import type { Skill } from "../skills";
import type { Employee } from "./interfaces";

import faker from "faker";

import { skillList } from "../skills/fixtures";

faker.seed(0);

let employeeId = 0;
export function makeEmployee(employee?: Partial<Employee>): Employee {
  const startDate = faker.date.past();

  const skills: Skill[] = faker.random
    .arrayElements(skillList, faker.datatype.number(3) + 1)
    .map(({ name, id }) => ({ name, id }));

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
