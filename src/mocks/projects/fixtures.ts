import faker from "faker";

export interface JSONProject {
  type: "Project";
  id: string;
  attributes: {
    name: string;
    description?: string;
  };
}

const fakerSeedBase = 2000;
let projectId = 2000;

export function makeProject(): JSONProject {
  faker.seed(fakerSeedBase + projectId);

  return {
    type: "Project",
    id: `${++projectId}`,
    attributes: {
      name: `${faker.name.jobDescriptor()} ${faker.name.jobTitle()}s`,
      description: faker.lorem.sentences(4),
    },
  };
}

export const projects: JSONProject[] = [
  makeProject(),
  makeProject(),
  makeProject(),
  makeProject(),
  makeProject(),
];
