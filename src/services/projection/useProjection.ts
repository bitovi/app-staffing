import type { TimelineRange } from "./timeline";
import type { ProjectionGroup } from "./projections";

import { useMemo } from "react";

import getTimeline from "./timeline";
import getProjections from "./projections";
import { Skill } from "../api";

export default function useProjection(
  date: Date = new Date(),
  availableSkills: Skill[],
): {
  timeline: TimelineRange[];
  skills: ProjectionGroup[];
} {
  const timeline = useMemo(() => getTimeline(date), [date]);
  const skills = useMemo(
    () => getProjections(timeline, availableSkills),
    [timeline, availableSkills],
  );

  return {
    timeline,
    skills,
  };
}
