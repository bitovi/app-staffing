import type { ProjectedData, RoleProjection } from "./interfaces";

import faker from "faker";

import { skills } from "../../../mocks/skills/fixtures";

/** creates an action with weights */
const makeAction = (): "Sell" | "Hire" | "Assign" | "Ok" => {
  const id = faker.datatype.number(10);

  return id <= 1 ? "Sell" : id <= 2 ? "Hire" : id <= 4 ? "Assign" : "Ok";
};

const makeProjection = (
  projection?: Partial<RoleProjection>,
): RoleProjection => {
  return {
    needed: [],
    bench: [],
    action: makeAction(),
    ...projection,
  };
};

export const createProjectedData = (
  numberOfProjections: number,
): ProjectedData[] =>
  skills.map((skill) => ({
    role: skill,
    roleProjection: [...Array(numberOfProjections).keys()].map((_) =>
      makeProjection(),
    ),
  }));