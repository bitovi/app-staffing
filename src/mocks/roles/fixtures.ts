import type { JSONProject } from "../fixtures";

import faker from "faker";

import { skills } from "../skills/fixtures";

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
    assignments?: {
      data: Array<{ type: "assignments"; id: string }>;
    };
    project?: {
      data: { type: "projects"; id: string };
    };
    skills?: {
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
          .map(({ id }) => ({ type: "skills", id })),
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

const mockRoleCardProps = {
  role: {
    id: "5f6a2f57-2f0e-48d7-ac28-1aae14792e57",
    startDate: "Mon Aug 22 2022 00:00:00 GMT-0400 (Eastern Daylight Time)",
    startConfidence: 0.5,
    endDate: "Fri Oct 14 2022 00:00:00 GMT-0400 (Eastern Daylight Time)",
    endConfidence: 0.6,
    projectId: "f9061899-80af-4337-ae32-913edf0f6fed",
    assignments: [
      {
        id: "2f313b76-26c9-4dc1-8708-e964c3ce4b6f",
        employeeId: "0a2b5826-5a56-4f4f-90f6-b8dfbeae6598",
        roleId: "5f6a2f57-2f0e-48d7-ac28-1aae14792e57",
        startDate: "Thu Apr 04 2024 20:00:00 GMT-0400 (Eastern Daylight Time)",
        endDate: "Sun Dec 22 2024 19:00:00 GMT-0500 (Eastern Standard Time)",
        employee: {
          id: "0a2b5826-5a56-4f4f-90f6-b8dfbeae6598",
          name: "Celestino Reilly",
          startDate:
            "Sun Aug 21 2022 20:00:00 GMT-0400 (Eastern Daylight Time)",
          endDate: null,
        },
      },
    ],
    skills: ['{id: "a8ff7e2b-6097-4914-91a5-7b7ca704eacc", name: …}'],
  },
  handleDeleteRole: "ƒ bound dispatchAction() {}",
  handleEditRole: "ƒ bound dispatchAction() {}",
};
