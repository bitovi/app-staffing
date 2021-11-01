import type { AssignedEmployee } from "../employees";
import type { Role } from "./interfaces";

import faker from "faker";

import { skills } from "../skills/fixtures";
// import { employees } from "../employees/fixtures";

faker.seed(0);

let roleId = 100;
export function makeRole(role?: Partial<Role>): Role {
  const startDate = {
    date: faker.date.past(),
    confidence: `${faker.datatype.number({ min: 0, max: 100 })}%`,
  };

  const endDate = {
    date: faker.date.past(),
    confidence: `${faker.datatype.number({ min: 0, max: 100 })}%`,
  };

  const assignedEmployees: AssignedEmployee[] = [];

  // const assignedEmployees: AssignedEmployee[] = faker.random
  //   .arrayElements(employees, faker.datatype.number(2) + 1)
  //   .map((employee) => ({
  //     employee,
  //     startDate: faker.date.past(),
  //     endDate: faker.date.future(),
  //   }));

  return {
    id: `${++roleId}`,
    skill: faker.random.arrayElement(skills),
    startDate,
    endDate,
    employees: assignedEmployees,
    ...role,
  };
}

export const roles = [
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
  makeRole(),
];
