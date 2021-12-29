import faker from "faker";

import { roles } from "../roles/fixtures";

export interface JSONProject {
  id: string;
  attributes: {
    name: string;
    description: string;
  };
  relationships: {
    roles: {
      data: Array<{ type: "roles"; id: string }>;
    };
  };
}

faker.seed(0);

let projectId = 1000;

export function makeProject(): JSONProject {
  return {
    id: `${++projectId}`,
    attributes: {
      name: `${faker.name.jobDescriptor()} ${faker.name.jobTitle()}s`,
      description: faker.lorem.sentences(4),
    },
    relationships: {
      roles: {
        data: faker.random
          .arrayElements(roles, 3)
          .map(({ id }) => ({ type: "roles", id })),
      },
    },
  };
}

export const projects: JSONProject[] = [
  makeProject(),
  makeProject(),
  makeProject(),
  makeProject(),
];
