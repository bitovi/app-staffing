import type { ComponentStory, ComponentMeta } from "@storybook/react";
import ProjectsHeader from "./ProjectsHeader";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Pages/Projects/ProjectsHeader",
  component: ProjectsHeader,
} as ComponentMeta<typeof ProjectsHeader>;

export const Basic: ComponentStory<typeof ProjectsHeader> = ({
  loading,
}: {
  loading?: boolean;
}) => <ProjectsHeader loading={loading} />;

export const withProject: ComponentStory<typeof ProjectsHeader> = ({
  loading,
  name,
}: {
  loading?: boolean;
  name?: string;
}) => (
  <BrowserRouter>
    <ProjectsHeader name={name} loading={loading} />
  </BrowserRouter>
);

Basic.args = {
  loading: false,
};

withProject.args = {
  loading: false,
  name: "Chic-fil-A",
};
