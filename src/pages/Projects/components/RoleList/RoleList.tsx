import type { Project, Role } from "../../../../services/api";

import RoleDetails from "../RoleDetails";
import Button from "../../../../components/Button";

import styles from "./RoleList.module.scss";

export default function RoleList({
  project,
  updateRole,
  destroyRole,
}: {
  project: Project;
  updateRole: (id: string, project: Role) => Promise<void>;
  destroyRole: (id: string) => Promise<void>;
}): JSX.Element {
  return (
    <>
      <Button onClick={() => console.log("TODO")}>Add Role</Button>
      <div className={styles.skillFilter}>
        {[].map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
      {project?.roles?.map((role) => (
        <RoleDetails
          key={role.id}
          role={role}
          updateRole={updateRole}
          destroyRole={destroyRole}
        />
      ))}
    </>
  );
}
