import type { ComponentStory, ComponentMeta } from "@storybook/react";
import ProjectsHeader from "./ProjectsHeader";

export default {
  title: "Pages/Projects/ProjectsHeader",
  component: ProjectsHeader,
} as ComponentMeta<typeof ProjectsHeader>;

export const Basic: ComponentStory<typeof ProjectsHeader> = ({
  loading,
}: {
  loading?: boolean;
}) => <ProjectsHeader loading={loading} />;

Basic.args = {
  loading: false,
};
