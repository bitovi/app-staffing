import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Project, ProjectActions } from "../../../services/api";
import { QueriableList, ResponseStatus } from "../../../services/api/shared";
import Projects from "./Projects";

export default {
  title: "Pages/Projects",
  component: Projects
} as ComponentMeta<typeof Projects>;

export const Loading: ComponentStory<typeof Projects> = ({ ...props }) => {

  const mockLoadingProjectsHook: (queryParams?: QueriableList<Project> | undefined) => ResponseStatus & ProjectActions = () => {
    return {
      projects: [],
      isLoading: true,
      error: undefined,
      addProject: () => Promise.resolve("new id"),
      updateProject: () => Promise.resolve()
    }
  };

  return <Projects useProjects={mockLoadingProjectsHook} />
};

export const LoadedProjects: ComponentStory<typeof Projects> = ({ ...props }) => {

  const mockLoadingProjectsHook: (queryParams?: QueriableList<Project> | undefined) => ResponseStatus & ProjectActions = () => {
    return {
      projects: [],
      isLoading: false,
      error: undefined,
      addProject: () => Promise.resolve("new id"),
      updateProject: () => Promise.resolve()
    }
  };

  return <Projects useProjects={mockLoadingProjectsHook} />
};
