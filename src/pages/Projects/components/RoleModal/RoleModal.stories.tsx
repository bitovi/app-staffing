import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useProjects, useRoles, useSkills} from "../../../../services/api";
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
      createRole={() => Promise.resolve()}
      onSave={() => {
        throw new Error("DOES NOT WORK");
      }}
      roles={project.roles}
    />
  );
};

export const SavePending: ComponentStory<typeof RoleModal> = () => {
  
  const skills = useSkills();
  const roles = useRoles();

  return (
    <RoleModal
      isOpen
      onClose={() => true}
      skills={skills}
      createRole={() => Promise.resolve()}
      onSave={() => new Promise(() => true)}
      roles={roles}
    />
  );
}