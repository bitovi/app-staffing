import { BrowserRouter } from "react-router-dom";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import ProjectCard from "./ProjectCard";
import { projects } from "../../../../../services/api/projects/fixtures";

export default {
  title: "ProjectCard",
  component: ProjectCard,
} as ComponentMeta<typeof ProjectCard>;

export const Basic: ComponentStory<typeof ProjectCard> = () => {
  return (
    <BrowserRouter>
      <ProjectCard
        project={projects[1]}
      />
    </BrowserRouter>
  )
}

