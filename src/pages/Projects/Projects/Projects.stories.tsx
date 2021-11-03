import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { projects } from "../../../services/api/projects/fixtures";
import Projects from "./Projects";

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

export const Error: ComponentStory<typeof Projects> = () => (
  <Projects
    useProjects={() => ({
      projects: [],
      isLoading: false,
      error: { name: "error", message: "msg" },
      addProject: () => Promise.resolve(""),
      updateProject: () => Promise.resolve(),
      deleteProject: () => Promise.resolve(),
      reset: () => undefined,
    })}
  />
);

export const nonEmpty: ComponentStory<typeof Projects> = () => (
  <Projects
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

export const Empty: ComponentStory<typeof Projects> = () => (
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
