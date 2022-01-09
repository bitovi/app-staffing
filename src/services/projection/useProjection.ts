import type { TimelineRange } from "./timeline";
import type { ProjectionGroup } from "./projections";

import { useMemo } from "react";

import getTimeline from "./timeline";
import getProjections from "./projections";

export default function useProjection(date: Date = new Date()): {
  timeline: TimelineRange[];
  skills: ProjectionGroup[];
} {
  const timeline = useMemo(() => getTimeline(date), [date]);
  const skills = useMemo(() => getProjections(timeline), [timeline]);

  return {
    timeline,
    skills,
  };
}
