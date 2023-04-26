import type { JSONProject } from "../fixtures";

import faker from "faker";

import { skills } from "../skills/fixtures";

export interface JSONRole {
  type: "Role";
  id: string;
  attributes: {
    start_date?: Date;
    start_confidence?: number;
    end_date?: Date;
    end_confidence?: number;
  };
  relationships: {
    assignments?: {
      data: Array<{ type: "Assignment"; id: string }>;
    };
    project?: {
      data: { type: "Project"; id: string };
    };
    skills?: {
      data: Array<{ type: "Skill"; id: string }>;
    };
  };
}

const fakerSeedBase = 3000;
let roleId = 3000;

export function makeRole(project: JSONProject): JSONRole {
  faker.seed(fakerSeedBase + roleId);

  return {
    type: "Role",
    id: `${++roleId}`,
    attributes: {
      start_date: faker.date.past(),
      start_confidence: faker.datatype.number({
        min: 0.1,
        max: 0.9,
        precision: 0.1,
      }),
      end_date: faker.date.past(),
      end_confidence: faker.datatype.number({
        min: 0.1,
        max: 0.9,
        precision: 0.1,
      }),
    },
    relationships: {
      assignments: {
        data: [],
      },
      project: {
        data: {
          type: project.type,
          id: project.id,
        },
      },
      skills: {
        data: faker.random
          .arrayElements(skills, faker.datatype.number({ min: 1, max: 1 }))
          .map(({ id }) => ({ type: "Skill", id })),
      },
    },
  };
}

export const roles: JSONRole[] = [];

export function addRole(project: JSONProject): JSONRole {
  const role = makeRole(project);

  roles.push(role);

  return role;
}
