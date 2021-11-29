import type { Skill } from "../skills";
import type { AssignedEmployee } from "../employees";

export interface EstimatedDate {
  date?: Date;
  confidence: string;
}

export interface Role {
  id: string;
  skill: Skill;
  startDate: EstimatedDate;
  endDate: EstimatedDate;
  employees?: AssignedEmployee[];
  projectId: string,
}

export interface RoleTable {
  id: string;
  startDate: EstimatedDate;
  endDate: EstimatedDate;
  projectId: string;
}

export type NewRole = Omit<Role, "id">;

export interface JSONAPIRole {
  type: string;
  id: string;
  attributes: {
    startDate: EstimatedDate;
    endDate: EstimatedDate;
    projectId: string;
  };
  relationships: {
    skills: {
      data: {
        type: string;
        id: string;
      };
    };
  }
}

export interface FrontEndRole
  extends Omit<JSONAPIRole, "id" | "attributes" | "relationships"> {
  attributes: {
    startDate: string | null;
    startConfidence: number | null;
    endDate: string | null;
    endConfidence: number | null;
    projectId: string;
  };
  relationships: {
    skills: {
      data: {
        type: string;
        id: string;
      };
    }
  }
}