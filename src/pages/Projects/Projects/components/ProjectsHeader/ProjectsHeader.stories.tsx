import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { useProjects } from "../../../../../services/api";
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

export const HasProject: ComponentStory<typeof ProjectsHeader> = ({
  loading,
}: {
  loading?: boolean;
}) => {
  const projects = useProjects();
  const project = projects[0];
  return (
    <BrowserRouter>
      <ProjectsHeader project={project} loading={loading} />
    </BrowserRouter>
  );
};

Basic.args = {
  loading: true,
};
