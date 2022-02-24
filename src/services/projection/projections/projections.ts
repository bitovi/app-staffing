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
  availableSkills: Skill[],
): ProjectionGroup[] {
  const getRandomInt = (): number => {
    return Math.floor(Math.random() * 4);
  };

  const getRandomAction = (): string => {
    const actions = ["OK", "Hire", "Assign", "Sell"];
    return actions[getRandomInt()];
  };

  return availableSkills.map((skill) => {
    return {
      skill,
      projections: new Array<Projection>(timeline.length).fill({
        needed: getRandomInt(),
        bench: getRandomInt(),
        action: getRandomAction(),
      }),
    };
  });
}
