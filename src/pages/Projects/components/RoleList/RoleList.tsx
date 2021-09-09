import type { Role, Project } from "../../../../services/api";

import cloneDeep from "lodash.clonedeep";

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
      <div className={styles.skillFilter}>
        {skillList.map((s) => (
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
