import { useState } from "react";
import type { Project, Role } from "../../../../services/api";

import { cloneDeep } from "lodash";
import RoleDetails from "../RoleDetails";
import Button from "../../../../components/Button";
import RoleModal from "../../components/RoleModal";
import { useSkills, useRoles } from "../../../../services/api";

import styles from "./RoleList.module.scss";

export default function RoleList({
  project,
  onEdit,
}: {
  project: Project;
  onEdit: (project: Project) => void;
}): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { skills } = useSkills();
  const { addRole } = useRoles();

  // const createNewRole = (role: Role) => {
  //   return {
  //     id: Math.floor(Math.random() * 1000).toString(),
  //     skill: { name: "Node", id: "" },
  //     startDate: {
  //       date: undefined,
  //       confidence: "",
  //     },
  //     endDate: {
  //       date: undefined,
  //       confidence: "",
  //     },
  //     employees: [],
  //     projectId: ""
  //   };
  // };

  const editRole = (role: Role) => {
    const roles = cloneDeep(project.roles);
    const index = roles.findIndex(({ id }) => id === role.id);
    roles[index] = role;

    onEdit({
      ...project,
      roles,
    });
  };

  const deleteRole = (role: Role) => {
    onEdit({
      ...project,
      roles: project.roles.filter(({ id }) => id != role.id),
    });
  };

  return (
    <>
      <RoleModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={addRole}
        skills={skills}
        projectId={project.id}
      />
      <Button onClick={() => setOpenModal(true)}>Add Role</Button>
      <div className={styles.skillFilter}>
        {[].map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
      {project.roles.map((role) => (
        <RoleDetails
          role={role}
          key={role.id}
          editRole={editRole}
          deleteRole={deleteRole}
        />
      ))}
    </>
  );
}
