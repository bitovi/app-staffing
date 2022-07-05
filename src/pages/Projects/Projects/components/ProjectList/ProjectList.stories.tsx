import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import ProjectList from ".";
import { useProjects } from "../../../../../services/api";

export default {
  title: "Pages/Projects/ProjectList",
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  component: ProjectList,
} as ComponentMeta<typeof ProjectList>;

export const Basic: ComponentStory<typeof ProjectList> = ({ ...props }) => {
  const projects = useProjects();
  return <ProjectList {...props} projects={projects} />;
};

Basic.args = {};
