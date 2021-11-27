import type { Projection } from "./interfaces";

import { useMemo } from "react";

import { getTimeline } from "../../timeline";
import { createProjectedData } from "./fixtures";

export const useProjection = (date: Date = new Date()): Projection => {
  const timeline = useMemo(() => getTimeline(date), [date]);
  const projections = useMemo(
    () => createProjectedData(timeline.length),
    [timeline],
  );

  return {
    timeline,
    projections,
  };
};
