import type { Role } from "../../../../services/api";
import { skillList } from "../../../../services/api";

import RoleDetails from "../RoleDetails";

import styles from "./RoleList.module.scss";

export default function RoleList({ roles }: { roles: Role[] }): JSX.Element {
  return (
    <>
      <div className={styles.skillFilter}>
        {skillList.map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
      {roles.map((role, index) => (
        <RoleDetails role={role} key={role.employee?.id || index} />
      ))}
    </>
  );
}
