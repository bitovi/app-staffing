import type { TimelineRange } from "./timeline";

import { useMemo } from "react";

import getTimeline from "./timeline";

export default function useTimeline(
  date: Date = new Date(),
): {
  timeline: TimelineRange[];
} {
  const timeline = useMemo(() => getTimeline(date), [date]);

  return {
    timeline,
  };
}
