import { Employee, SkillName } from "../api";
import { TimescaleData } from "./timesReport";

export interface RoleProjection {
  needed: Array<{ projectName: string; projectedConfidence: number }>;
  bench: Array<Employee>;
  action: "Ok" | "Hire" | "Sell" | "Assign";
}

export interface ProjectedData {
  role: SkillName;
  projections: RoleProjection[];
}

export interface TimeReportData {
  dates: TimescaleData[];
  data:  ProjectedData[]
}
