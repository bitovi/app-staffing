import AddProjectModal from "./AddProjectModal";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Pages/Projects/AddProjectModal",
  component: AddProjectModal,
} as ComponentMeta<typeof AddProjectModal>;

export const Basic: ComponentStory<typeof AddProjectModal> = () => {
  return (
    <AddProjectModal
      addProject={(project) => {
        alert(`add ${project}`);
      }}
      isOpen={true}
      onClose={() => Promise.resolve()}
    />
  );
};
