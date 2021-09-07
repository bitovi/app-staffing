import type { Role } from "../../../../services/api";

import { skillList, useEmployees } from "../../../../services/api";

import styles from "./RoleDetails.module.scss";

export default function RoleDetails({ role }: { role: Role }): JSX.Element {
  const { data: employees } = useEmployees();

  return (
    <div className={styles.roleContainer}>
      <div>
        <div>Role:</div>
        <select defaultValue={skillList[0]}>
          {skillList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <div className={styles.roleGrid}></div>
      </div>
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
      <select defaultValue={role.employee?.name}>
        {employees?.map(({ name, id }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </select>

      <button>Delete</button>
    </div>
  );
}
