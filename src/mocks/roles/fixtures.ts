import faker from "faker";
// import { ProjectRoleTable } from "../../services/api/Roles/Roles";

import { skills } from "../skills/fixtures";
// import { ProjectRoleTable } from "../../services/api/Roles/Roles";

export interface JSONRole {
  id: string;
  type?: string;
  attributes: {
    start_date: Date;
    start_confidence: number;
    end_date: Date;
    end_confidence: number;
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

faker.seed(0);

let roleId = 100;
export function makeRole(): JSONRole {
  return {
    id: `${++roleId}`,
    attributes: {
      start_date: faker.date.past(),
      start_confidence: faker.datatype.number({ min: 0, max: 100 }),
      end_date: faker.date.past(),
      end_confidence: faker.datatype.number({ min: 0, max: 100 }),
    },
    relationships: {
      assignments: {
        data: [{ type: "assignments", id: "" }],
      },
      project: {
        data: { type: "projects", id: "" },
      },
      skills: {
        data: faker.random
          .arrayElements(skills, faker.datatype.number({ min: 1, max: 3 }))
          .map(({ id }) => ({ type: "skills", id })),
      },
    },
  };
}

export const roles: JSONRole[] = [
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
