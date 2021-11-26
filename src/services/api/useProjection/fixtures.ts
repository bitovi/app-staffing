import type { ProjectedData, RoleProjection } from "../../timeline";

import faker from "faker";

import { skills } from "../skills/fixtures";

const makeProjection = (
  projection?: Partial<RoleProjection>,
): RoleProjection => {
  const action = faker.datatype.number(3);

  return {
    needed: [],
    bench: [],
    action:
      action === 1
        ? "Ok"
        : action === 2
        ? "Hire"
        : action === 3
        ? "Assign"
        : "Sell",

    ...projection,
  };
};

export const projectedData: ProjectedData[] = skills.map((skill) => ({
  role: skill,
  projections: [...Array(13).keys()].map((_) => makeProjection()),
}));
