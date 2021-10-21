import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  mockEmptyProjectsHook,
  mockLoadingProjectsHook,
} from "../../../services/api/useProjects/mocks";
import Projects from "./Projects";

export default {
  title: "Pages/Projects",
  component: Projects,
} as ComponentMeta<typeof Projects>;

export const Loading: ComponentStory<typeof Projects> = ({ ...props }) => (
  <Projects useProjects={mockLoadingProjectsHook} />
);

export const EmptyProjects: ComponentStory<typeof Projects> = ({
  ...props
}) => <Projects useProjects={mockEmptyProjectsHook} />;
