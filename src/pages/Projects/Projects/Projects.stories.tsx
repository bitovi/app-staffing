import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { Projects, LoadingProjectList } from "./Projects";
import { useProjects } from "../../../services/api";

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

export const Empty: ComponentStory<typeof Projects> = () => {
  return (
    <Projects
      useProjects={() => []}
      useProjectMutations={() => {
        return {
          createProject: (project) => Promise.resolve(""),
          updateProject: (id) => Promise.resolve(),
          destroyProject: (id) => Promise.resolve(),
        };
      }}
    />
  );
};

export const nonEmpty: ComponentStory<typeof Projects> = () => {
  return (
    <Projects
      useProjects={useProjects}
      useProjectMutations={() => {
        return {
          createProject: (project) => Promise.resolve(""),
          updateProject: (id) => Promise.resolve(),
          destroyProject: (id) => Promise.resolve(),
        };
      }}
    />
  );
};

export const Loading: ComponentStory<typeof LoadingProjectList> = () => (
  <LoadingProjectList />
);
