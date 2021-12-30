import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { BrowserRouter } from "react-router-dom";

import ProjectCard from "./ProjectCard";
import { useProjects } from "../../../../../services/api";

export default {
  title: "Pages/Projects/ProjectCard",
  component: ProjectCard,
} as ComponentMeta<typeof ProjectCard>;

export const Basic: ComponentStory<typeof ProjectCard> = () => {
  const project = useProjects()[0];
  return (
    <BrowserRouter>
      <ProjectCard project={project} />
    </BrowserRouter>
  );
};
