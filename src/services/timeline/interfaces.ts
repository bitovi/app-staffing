import { Employee, Skill } from "../api";

export interface RoleProjection {
  needed: Array<{ projectName: string; projectedConfidence: number }>;
  bench: Array<Employee>;
  action: "Ok" | "Hire" | "Sell" | "Assign";
}

export interface ProjectedData {
  role: Skill;
  projections: RoleProjection[];
}

export type TimelineData = {
  startDate: Date;
  endDate: Date;
  type: TimescaleType;
};

export enum TimescaleType {
  week,
  month,
  quarter,
}
export interface TimeReportData {
  dates: TimelineData[];
  data: ProjectedData[];
}

export interface TimelineConfiguration {
  minimumWeeksShown?: number;
  minimumMonthsShown?: number;
}
