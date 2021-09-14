import type { Employee, Skill, Role } from "./shared";

import faker from "faker";

import { skillList } from "./shared";
import { AssignedEmployee, Project } from ".";

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

let roleId = 100;
export function makeRole(role?: Partial<Role>): Role {
  const startDate = {
    date: faker.date.past().toISOString(),
    confidence: `${faker.datatype.number({ min: 0, max: 100 })}%`,
  };

  const endDate = {
    date: faker.date.past().toISOString(),
    confidence: `${faker.datatype.number({ min: 0, max: 100 })}%`,
  };

  const assignedEmployees: AssignedEmployee[] = faker.random
    .arrayElements(employees, faker.datatype.number(2) + 1)
    .map((employee) => ({
      ...employee,
      assignmentStartDate: faker.date.past().toISOString(),
      assignmnetEndDate: faker.datatype.boolean()
        ? faker.date.future().toISOString()
        : undefined,
    }));

  return {
    id: `${++roleId}`,
    skill: { name: faker.random.arrayElement(skillList) },
    startDate,
    endDate,
    employees: assignedEmployees,

    ...role,
  };
}

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

export const projects = [
  makeProject(),
  makeProject(),
  makeProject(),
  makeProject(),
];
