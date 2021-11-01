import { Employee, Role, SkillName } from "../api";
import { TimescaleData } from "./timesReport";

export interface ProjectRolesNeed {
  projectName: string;
  projectedConfidence: number;
  roles: Role[];
}

export interface RoleProjection {
  needed: Array<ProjectRolesNeed>;
  bench: Array<Employee>;
  action: "Ok" | "Hire" | "Sell" | "Assign";
}

export interface ProjectedData {
  role: SkillName;
  projections: RoleProjection[];
}

export interface TimeReportData {
  dates: TimescaleData[];
  data: ProjectedData[];
}
