import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useEmployees, useProjects, useSkills } from "../../../../services/api";
import RoleModal from "./RoleModal";

export default {
  title: "Pages/Roles/RoleModal",
  component: RoleModal,
} as ComponentMeta<typeof RoleModal>;

export const Works: ComponentStory<typeof RoleModal> = () => {
  const skills = useSkills();
  const employees = useEmployees();
  const projects = useProjects();
  const project = projects[0];

  return (
    <RoleModal
      isOpen={true}
      onClose={() => true}
      skills={skills}
      employees={employees}
      project={project}
      createRole={() => Promise.resolve("")}
      createAssignment={() => Promise.resolve("")}
      updateRole={() => Promise.resolve()}
    />
  );
};
