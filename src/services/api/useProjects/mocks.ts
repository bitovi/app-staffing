import { Project, ProjectActions } from "..";
import { QueriableList, ResponseStatus } from "../shared";

export const mockLoadingProjectsHook: (
  queryParams?: QueriableList<Project> | undefined,
) => ResponseStatus & ProjectActions = () => ({
  projects: [],
  isLoading: true,
  error: undefined,
  addProject: () => Promise.resolve("new id"),
  updateProject: () => Promise.resolve(),
  deleteProject: () => Promise.resolve(),
});

export const mockEmptyProjectsHook: (
  queryParams?: QueriableList<Project> | undefined,
) => ResponseStatus & ProjectActions = () => ({
  projects: [],
  isLoading: false,
  error: undefined,
  addProject: () => Promise.resolve("new id"),
  updateProject: () => Promise.resolve(),
  deleteProject: () => Promise.resolve(),
});
