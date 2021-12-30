import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
// import { useProjects, Project } from "../../../services/api";
// import { projects } from "../../../services/api/mocks/projects/fixtures";
import Projects from "./Projects";

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

export const LoadingProjects: ComponentStory<typeof Projects> = () => (
  <Projects
  // useProjects={() => ({
  //   isLoading: true,
  //   error: undefined,
  //   addProject: () => Promise.resolve(""),
  //   updateProject: () => Promise.resolve(),
  //   deleteProject: () => Promise.resolve(),
  // })}
  />
);

// export const Error: ComponentStory<typeof Projects> = () => {
//   // const fake: typeof useProjects = async () => Array<Project>(0);
//   return null;

//   // <Projects useProjects={fake} />;
// };

// export const nonEmpty: ComponentStory<typeof Projects> = () => (
//   <Projects
//     useProjects={() => ({
//       projects,
//       isLoading: false,
//       error: undefined,
//       addProject: () => Promise.resolve(""),
//       updateProject: () => Promise.resolve(),
//       deleteProject: () => Promise.resolve(),
//       reset: () => undefined,
//     })}
//   />
// );

// export const Empty: ComponentStory<typeof Projects> = () => (
//   <Projects
//     useProjects={() => ({
//       projects: [],
//       isLoading: false,
//       error: undefined,
//       addProject: () => Promise.resolve(""),
//       updateProject: () => Promise.resolve(),
//       deleteProject: () => Promise.resolve(),
//       reset: () => undefined,
//     })}
//   />
// );
