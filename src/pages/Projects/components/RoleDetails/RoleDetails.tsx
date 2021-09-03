import type { Role } from "../../../../services/api";

import { skillList, useEmployees } from "../../../../services/api";

import styles from "./RoleDetails.module.scss";

export default function RoleDetails({ role }: { role: Role }) {
  const { data: employees } = useEmployees();

  return (
    <div className={styles.roleContainer}>
      <select>
        {employees?.map(({ name, id }) => (
          <option selected={role.employee?.name === name} value={id} key={id}>
            {name}
          </option>
        ))}
      </select>
      <div className={styles.dateContainer}>
        <label>
          Start Date:
          <input value="01/01/2000" />
        </label>
        <label>
          End Date:
          <input value="01/01/2001" />
        </label>
      </div>
      <div>
        <div>Role:</div>
        <select>
          {skillList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <div className={styles.roleGrid}></div>
      </div>
      <button>Delete</button>
    </div>
  );
}
