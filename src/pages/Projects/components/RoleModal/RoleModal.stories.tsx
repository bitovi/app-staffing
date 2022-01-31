import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useProjects, useSkills } from "../../../../services/api";
import RoleModal from "./RoleModal";

export default {
  title: "Pages/Roles/RoleModal",
  component: RoleModal,
} as ComponentMeta<typeof RoleModal>;

export const Works: ComponentStory<typeof RoleModal> = () => {
  const skills = useSkills();
  const projects = useProjects();
  const project = projects[0];

  return (
    <RoleModal
      isOpen={true}
      onClose={() => true}
      skills={skills}
      project={project}
      createRole={() => Promise.resolve("")}
    />
  );
};

export const SavePending: ComponentStory<typeof RoleModal> = () => {
  const skills = useSkills();

  return (
    <RoleModal
      isOpen
      onClose={() => true}
      skills={skills}
      createRole={() => Promise.resolve("")}
    />
  );
};
