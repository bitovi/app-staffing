import type { Project, NewProject } from "../projects";

export interface ProjectActions {
  projects?: Project[];
  addProject: (project: NewProject) => Promise<string>;
  updateProject: (
    projectId: string,
    project: Partial<Project>,
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
}
