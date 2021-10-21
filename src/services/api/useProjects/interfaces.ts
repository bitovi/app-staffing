import type { Project, NewProject } from "../projects";

export type ProjectActions = {
  projects?: Project[];
  addProject: (project: NewProject) => Promise<string>;
  updateProject: (
    projectId: string,
    project: Partial<Project>,
  ) => Promise<void>;
}
