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

// const projectedData: ProjectedData[] = [
//   {
//     role: "React",
//     projections: [
//       {
//         needed: [],
//         bench: [],
//         action: "Hire",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Assign",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Sell",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//     ],
//   },
//   {
//     role: "Angular",
//     projections: [
//       {
//         needed: [],
//         bench: [],
//         action: "Hire",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Assign",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Sell",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//     ],
//   },
//   {
//     role: "DevOps",
//     projections: [
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Assign",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Hire",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Sell",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//     ],
//   },
//   {
//     role: "UX",
//     projections: [
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Assign",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Hire",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Hire",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//     ],
//   },
//   {
//     role: "Design",
//     projections: [
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Assign",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Hire",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Sell",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//     ],
//   },
//   {
//     role: "Node",
//     projections: [
//       {
//         needed: [],
//         bench: [],
//         action: "Assign",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Hire",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Assign",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Hire",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Ok",
//       },
//       {
//         needed: [],
//         bench: [],
//         action: "Sell",
//       },
//     ],
//   },
// ];
