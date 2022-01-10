import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { Projects, LoadingProjectList } from "./Projects";
import { useProjects } from "../../../services/api";
import { useEffect } from "react";
import { Flex, Box } from "@chakra-ui/layout";

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

const backgroundColor = "gray.10";

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

function NonEmptyProjectsPage({ ...props }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <Flex height="100%" width="100%" overflow="hidden">
      <Box backgroundColor={backgroundColor} flex="1 1" padding="40px">
        <Projects
          {...props}
          useProjects={useProjects}
          useProjectMutations={() => {
            return {
              createProject: (project) => Promise.resolve(""),
              updateProject: (id) => Promise.resolve(),
              destroyProject: (id) => Promise.resolve(),
            };
          }}
        />
      </Box>
    </Flex>
  );
}

export const nonEmpty: ComponentStory<typeof Projects> = NonEmptyProjectsPage;

export const Loading: ComponentStory<typeof LoadingProjectList> = () => (
  <LoadingProjectList />
);
