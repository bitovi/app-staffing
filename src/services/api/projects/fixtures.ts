import type { Project } from "./interfaces";

import faker from "faker";

import { roles } from "../roles/fixtures";

faker.seed(0);

let projectId = 1000;
export function makeProject(project?: Partial<Project>): Project {
  return {
    id: `${++projectId}`,
    name: `${faker.name.jobDescriptor()} ${faker.name.jobTitle()}s`,
    description: faker.lorem.sentences(4),
    roles: faker.random.arrayElements(roles, 3),
    ...project,
  };
}

export const projects = [
  makeProject(),
  makeProject(),
  makeProject(),
  makeProject(),
];
