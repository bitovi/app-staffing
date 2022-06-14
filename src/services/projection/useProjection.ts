import type { TimelineRange } from "./timeline";
import type { ProjectionGroup, SkillRole } from "./projections";

import { useMemo } from "react";

import getTimeline from "./timeline";
import getProjections from "./projections";

export default function useProjection(
  date: Date = new Date(),
  skills: SkillRole[],
): {
  timeline: TimelineRange[];
  skillsWithProjection: ProjectionGroup[];
} {
  const timeline = useMemo(() => getTimeline(date), [date]);
  const skillsWithProjection = useMemo(() => getProjections(timeline, skills), [
    timeline,
    skills,
  ]);

  return {
    timeline,
    skillsWithProjection,
  };
}
