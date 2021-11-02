import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { projects } from "../../../services/api/projects/fixtures";
import Projects from "./Projects";
import { LoadingProjectList } from "./components/LoadingProjectList";

export default {
  title: "Pages/Projects",
  component: Projects,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Projects>;

export const LoadingProjects: ComponentStory<typeof Projects> = () => (
  <Projects
    useProjects={() => ({
      isLoading: true,
      error: undefined,
      addProject: () => Promise.resolve(""),
      updateProject: () => Promise.resolve(),
      deleteProject: () => Promise.resolve(),
      reset: () => undefined,
    })}
  />
);

export const LoadingProjectListComponent: ComponentStory<
  typeof LoadingProjectList
> = () => <LoadingProjectList />;

export const nonEmpty: ComponentStory<typeof Projects> = ({ ...props }) => (
  <Projects
    {...props}
    useProjects={() => ({
      projects,
      isLoading: false,
      error: undefined,
      addProject: () => Promise.resolve(""),
      updateProject: () => Promise.resolve(),
      deleteProject: () => Promise.resolve(),
      reset: () => undefined,
    })}
  />
);

export const Empty: ComponentStory<typeof Projects> = ({ ...props }) => (
  <Projects
    useProjects={() => ({
      projects: [],
      isLoading: false,
      error: undefined,
      addProject: () => Promise.resolve(""),
      updateProject: () => Promise.resolve(),
      deleteProject: () => Promise.resolve(),
      reset: () => undefined,
    })}
  />
);
