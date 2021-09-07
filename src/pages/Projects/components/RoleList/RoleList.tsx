import type { Role, Project } from "../../../../services/api";
import { skillList } from "../../../../services/api";

import RoleDetails from "../RoleDetails";

import styles from "./RoleList.module.scss";

export default function RoleList({
  project,
  onEdit,
}: {
  project: Project;
  onEdit: (project: Project) => void;
}): JSX.Element {
  const editRole = (editId: string) => (role: Role) => {
    const roles = project.roles;
    const index = roles.findIndex(({ id }) => id === editId);
    roles[index] = role;

    onEdit({
      ...project,
      roles,
    });
  };

  const deleteRole = (deleteId: string) => (role: Role) => {
    onEdit({
      ...project,
      roles: project.roles.filter(({ id }) => id != deleteId),
    });
  };

  return (
    <>
      <div className={styles.skillFilter}>
        {skillList.map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
      {project.roles.map((role) => (
        <RoleDetails
          role={role}
          key={role.id}
          editRole={editRole(role.id)}
          deleteRole={deleteRole(role.id)}
        />
      ))}
    </>
  );
}
