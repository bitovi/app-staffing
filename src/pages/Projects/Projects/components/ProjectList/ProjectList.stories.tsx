import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import ProjectList from ".";
import { projects } from "../../../../../services/api/mocks/projects/fixtures";

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

export const Basic: ComponentStory<typeof ProjectList> = ({ ...props }) => (
  <ProjectList {...props} />
);

Basic.args = {
  projects: projects,
};
