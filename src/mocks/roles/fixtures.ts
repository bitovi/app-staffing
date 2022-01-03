import type { JSONProject } from "..";

import faker from "faker";

import { skills } from "../skills/fixtures";

import serializer from "../../services/api/restBuilder/serializer";

export interface JSONRole {
  type: "roles";
  id: string;
  attributes: {
    start_date?: Date;
    start_confidence?: number;
    end_date?: Date;
    end_confidence?: number;
  };
  relationships: {
    assignments: {
      data: Array<{ type: "assignments"; id: string }>;
    };
    project: {
      data: { type: "projects"; id: string };
    };
    skills: {
      data: Array<{ type: "skills"; id: string }>;
    };
  };
}

const fakerSeedBase = 3000;
let roleId = 3000;

export function makeRole(project: JSONProject): JSONRole {
  faker.seed(fakerSeedBase + roleId);

  return {
    type: "roles",
    id: `${++roleId}`,
    attributes: {
      start_date: faker.date.past(),
      start_confidence: faker.datatype.number({
        min: 0.1,
        max: 0.9,
        precision: 0.05,
      }),
      end_date: faker.date.past(),
      end_confidence: faker.datatype.number({
        min: 0.1,
        max: 0.9,
        precision: 0.05,
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
          .arrayElements(skills, faker.datatype.number({ min: 1, max: 3 }))
          .map(({ id }) => ({ type: "skills", id })),
      },
    },
  };
}

export const roles: JSONRole[] = [];

export function addRole(project: JSONProject): JSONRole {
  const role = makeRole(project);

  project.relationships.roles.data.push({
    type: role.type,
    id: role.id,
  });

  roles.push(role);

  return role;
}

export const getDeserializedRoles = () =>
  serializer.deserialize("roles", {
    data: roles,
  });
