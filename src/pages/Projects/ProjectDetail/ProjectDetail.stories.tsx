import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter, Route } from "react-router";
import ProjectDetail from ".";
import { makeProject } from "../../../services/api/projects/fixtures";
export default {
  title: "Pages/ProjectDetail",
  component: ProjectDetail,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/123"]}>
        <Route path="/:id">
          <Story />
        </Route>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof ProjectDetail>;

const newProj = makeProject({ id: "123" });

export const ProjectWithRoles: ComponentStory<typeof ProjectDetail> = ({
  ...props
}) => {
  return (
    <ProjectDetail
      {...props}
      useProjects={() => ({
        isLoading: false,
        projects: [newProj],

        addProject: () => Promise.resolve("123"),
        deleteProject: () => Promise.resolve(undefined),
        updateProject: () => Promise.resolve(undefined),
      })}
    />
  );
};

const noRolesProject = JSON.parse(JSON.stringify(newProj));
noRolesProject.roles = [];

export const ProjectWithoutRoles: ComponentStory<typeof ProjectDetail> = ({
  ...props
}) => {
  return (
    <ProjectDetail
      {...props}
      useProjects={() => ({
        isLoading: false,
        projects: [noRolesProject],

        addProject: () => Promise.resolve("123"),
        deleteProject: () => Promise.resolve(undefined),
        updateProject: () => Promise.resolve(undefined),
      })}
    />
  );
};
