import type { ComponentStory, ComponentMeta } from "@storybook/react";
import ProjectDescription from ".";

import { makeProject } from "../../../../services/api/projects/fixtures";

export default {
  title: "Components/ProjectDescription",
  component: ProjectDescription,
} as ComponentMeta<typeof ProjectDescription>;

const Template: ComponentStory<typeof ProjectDescription> = ({ ...props }) => (
  <ProjectDescription {...props} />
);

const newProj = makeProject();

export const Basic = Template.bind({});

Basic.args = {
  project: newProj,
  onEdit: () => console.log("edit"),
};
