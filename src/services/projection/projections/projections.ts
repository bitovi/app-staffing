import type { Role, Skill } from "../../api";
import type { TimelineRange } from "../timeline";
import { calculateNeededForSkill } from "./needed";

export interface Projection {
  action: string;
  needed: number;
  bench: number;
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
    const needed: number[] = calculateNeededForSkill(skill, timeline);

    const neededProjection: Omit<Projection, "action" | "bench">[] = needed.map(
      (neededForPeriod) => ({
        needed: neededForPeriod,
      }),
    );

    const projections: Projection[] = neededProjection.map((projection) => ({
      ...projection,
      bench: getRandomInt(),
      action: getRandomAction(),
    }));

    return {
      skill,
      projections,
    };
  });
}
