import type { Role } from "../roles";

export interface Project {
  id: string;
  name: string;
  description: string;
  roles: Role[];
}

export type NewProject = Omit<Project, "id">;
