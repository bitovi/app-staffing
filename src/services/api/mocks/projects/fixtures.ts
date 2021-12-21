import faker from "faker";

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
        data: [{ type: "roles", id: "" }],
      },
    },
  };
}

export const projects = [
  makeProject(),
  makeProject(),
  makeProject(),
  makeProject(),
];
