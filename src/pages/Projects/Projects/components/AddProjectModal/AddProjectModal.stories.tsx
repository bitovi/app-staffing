import AddProjectModal from "./AddProjectModal";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Loading from "../../../../Loading";
import { Suspense } from "react";

export default {
  title: "Pages/Projects/AddProjectModal",
  component: AddProjectModal,
} as ComponentMeta<typeof AddProjectModal>;

export const Basic: ComponentStory<typeof AddProjectModal> = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AddProjectModal
        addProject={(project) => {
          console.log();
        }}
        isOpen={true}
        onClose={() => Promise.resolve()}
      />
    </Suspense>
  );
};
