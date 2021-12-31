import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { StylesProvider } from "@chakra-ui/react";

import ProjectCard from "./ProjectCard";
import { useProjects } from "../../../../../services/api";
import theme from "../../../../../theme";

export default {
  title: "Pages/Projects/ProjectCard",
  component: ProjectCard,
  decorators: [
    (Story) => (
      <StylesProvider value={theme}>
        <Suspense fallback={""}>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </Suspense>
      </StylesProvider>
    ),
  ],
} as ComponentMeta<typeof ProjectCard>;

export const Basic: ComponentStory<typeof ProjectCard> = () => {
  const project = useProjects()[0];

  return <ProjectCard project={project} />;
};
