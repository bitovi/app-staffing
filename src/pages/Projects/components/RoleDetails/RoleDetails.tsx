import React from "react";
import type { Role, SkillName } from "../../../../services/api";

import { skillList, useEmployees } from "../../../../services/api";

import styles from "./RoleDetails.module.scss";

export default function RoleDetails({
  role,
  editRole,
  deleteRole,
}: {
  role: Role;
  editRole: (role: Role) => void;
  deleteRole: (role: Role) => void;
}): JSX.Element {
  const { data: employees } = useEmployees();

  const updateRole = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;

    editRole({ ...role, [name]: value });
  };

  return (
    <div className={styles.roleContainer}>
      <div>
        <div>Role:</div>
        <select
          onChange={({ target }) =>
            editRole({ ...role, skill: { name: target.value as SkillName } })
          }
          defaultValue={role.skill.name}
        >
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
          <input
            defaultValue={role.startDate}
            name="startDate"
            onBlur={updateRole}
          />
        </label>
        <label>
          End Date:
          <input
            defaultValue={role.endDate}
            name="endDate"
            onBlur={updateRole}
          />
        </label>
      </div>
      {role.employee && employees && (
        <select
          onChange={({ target }) => {
            editRole({
              ...role,
              employee: employees.find(({ name }) => name === target.value),
            });
          }}
          defaultValue={role.employee.name}
        >
          {employees.map((e, idx) => (
            <option value={e.name} key={e.id + idx}>
              {e.name}
            </option>
          ))}
        </select>
      )}

      <button onClick={() => deleteRole(role)}>Delete</button>
    </div>
  );
}
