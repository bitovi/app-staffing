import type { Role, Skill } from "../../api";
import type { TimelineRange } from "../timeline";
import { calculateNeededForSkill } from "./needed";
import { calculateBenchForSkill } from "./bench";

export interface Needed {
  total: number;
  roles?: { projectName?: string; value: number }[];
}

export interface Bench {
  total: number;
  employees?: { name: string; value: number }[];
}

export interface Projection {
  action: string;
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

export default function getProjections(
  timeline: TimelineRange[],
  skills: SkillRole[],
): ProjectionGroup[] {
  const getRandomInt = (): number => {
    return Math.floor(Math.random() * 4);
  };

  const getRandomAction = (): string => {
    const actions = ["OK", "Hire", "Assign", "Sell"];
    return actions[getRandomInt()];
  };

  return skills.map((skill) => {
    const needed: Needed[] = calculateNeededForSkill(skill, timeline);
    const bench: Bench[] = calculateBenchForSkill(skill, timeline);

    const projections: Projection[] = timeline.map((_period, index) => ({
      needed: needed[index],
      bench: bench[index],
      action: getRandomAction(),
    }));

    return {
      skill,
      projections,
    };
  });
}
