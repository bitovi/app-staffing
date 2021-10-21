import type { AssignedEmployee } from "../employees";
import type { Project, Role } from "./interfaces";

import faker from "faker";

import { skillList } from "../skills/fixtures";
import { employees } from "../employees/fixtures";

faker.seed(0);

let projectId = 1000;
export function makeProject(project?: Partial<Project>): Project {
  return {
    id: `${++projectId}`,
    name: `${faker.name.jobDescriptor()} ${faker.name.jobTitle()}s`,
    description: faker.lorem.sentences(4),
    roles: [makeRole(), makeRole(), makeRole()],
    ...project,
  };
}

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

  const assignedEmployees: AssignedEmployee[] = faker.random
    .arrayElements(employees, faker.datatype.number(2) + 1)
    .map((employee) => ({
      employee,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
    }));

  return {
    id: `${++roleId}`,
    skill: faker.random.arrayElement(skillList),
    startDate,
    endDate,
    employees: assignedEmployees,

    ...role,
  };
}

export const projects = [
  makeProject(),
  makeProject(),
  makeProject(),
  makeProject(),
];
