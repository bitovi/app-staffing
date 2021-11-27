import type { Skill, Employee } from "../../api";
import type { TimelineData } from "../../timeline";

export type ProjectionAction = "Ok" | "Hire" | "Sell" | "Assign";

export interface RoleProjection {
  needed: Array<{ projectName: string; projectedConfidence: number }>;
  bench: Employee[];
  action: ProjectionAction;
}

export interface ProjectedData {
  role: Skill;
  roleProjection: RoleProjection[];
}

export interface Projection {
  timeline: TimelineData[];
  projections: ProjectedData[];
}
