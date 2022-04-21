import type { Role, Skill } from "../../api";
import type { TimelineRange } from "../timeline";
import { calculateNeededForSkill } from "./needed";
import { calculateBenchForSkill } from "./bench";

export interface Needed {
  total: number;
  roles?: { project?: { name: string; id: string }; value: number }[];
}

export interface Bench {
  total: number;
  employees?: { name: string; value: number }[];
}

export interface Projection {
  action: Action;
  needed: Needed;
  bench: Bench;
}

export interface ProjectionGroup {
  skill: Skill;
  projections: Projection[];
}

export interface SkillRole extends Skill {
  roles?: Role[];
}

export enum Actions {
  Sell = "Sell",
  Hire = "Hire",
  Assign = "Assign",
  Ok = "OK",
}

const actions = ["OK", "Hire", "Assign", "Sell"] as const;
export type Action = typeof actions[number];

export const getAction = (needed: number, bench: number): Action => {
  const threshold = 2;

  if (bench - needed > threshold) {
    return "Sell";
  } else if (needed > bench) {
    return "Hire";
  } else if (needed < bench) {
    return "Assign";
  }
  return "OK";
};

export default function getProjections(
  timeline: TimelineRange[],
  skills: SkillRole[],
): ProjectionGroup[] {
  return skills.map((skill) => {
    const needed: Needed[] = calculateNeededForSkill(skill, timeline);
    const bench: Bench[] = calculateBenchForSkill(skill, timeline);

    const projections: Projection[] = timeline.map((_period, index) => ({
      needed: needed[index],
      bench: bench[index],
      action: getAction(needed[index].total, bench[index].total),
    }));

    return {
      skill,
      projections,
    };
  });
}
