import ProjectModal from "./ProjectModal";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Pages/Projects/ProjectModal",
  component: ProjectModal,
} as ComponentMeta<typeof ProjectModal>;

export const Basic: ComponentStory<typeof ProjectModal> = () => {
  return (
    <ProjectModal
      addProject={(project) => {
        alert(`add ${project}`);
      }}
      isOpen={true}
      onClose={() => Promise.resolve()}
    />
  );
};
