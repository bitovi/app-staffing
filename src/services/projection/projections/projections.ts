import type { Skill } from "../../api";
import type { TimelineRange } from "../timeline";

export interface Projection {
  action: string;
  needed: number;
  bench: number;
}

export interface ProjectionGroup {
  skill: Skill;
  projections: Projection[];
}

export default function getProjections(
  timeline: TimelineRange[],
): ProjectionGroup[] {
  return [
    {
      skill: { id: "101", name: "Angular" },
      projections: new Array<Projection>(timeline.length).fill({
        needed: 0,
        bench: 0,
        action: "OK",
      }),
    },
    {
      skill: { id: "104", name: "React" },
      projections: new Array<Projection>(timeline.length).fill({
        needed: 3,
        bench: 1,
        action: "Hire",
      }),
    },
    {
      skill: { id: "102", name: "DevOps" },
      projections: new Array<Projection>(timeline.length).fill({
        needed: 2,
        bench: 0,
        action: "Hire",
      }),
    },
    {
      skill: { id: "103", name: "Node" },
      projections: new Array<Projection>(timeline.length).fill({
        needed: 3,
        bench: 3,
        action: "Assign",
      }),
    },
    {
      skill: { id: "105", name: "Product" },
      projections: new Array<Projection>(timeline.length).fill({
        needed: 0,
        bench: 2,
        action: "Sell",
      }),
    },
    {
      skill: { id: "106", name: "Project Management" },
      projections: new Array<Projection>(timeline.length).fill({
        needed: 1,
        bench: 3,
        action: "Sell",
      }),
    },
  ];
}
