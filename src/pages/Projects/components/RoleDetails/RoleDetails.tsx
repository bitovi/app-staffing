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

  const onRoleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    editRole({ ...role, skill: { name: target.value as SkillName } });
  };

  const onEmployeeSelect = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    editRole({
      ...role,
      employee: employees?.find(({ id }) => id === target.value),
    });
  };

  return (
    <div className={styles.roleContainer}>
      <div>
        <div>Role:</div>
        <select onChange={onRoleSelect} defaultValue={role.skill.name}>
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
            value={role.startDate}
            name="startDate"
            onChange={updateRole}
          />
        </label>
        <label>
          End Date:
          <input value={role.endDate} name="endDate" onChange={updateRole} />
        </label>
      </div>
      <select onChange={onEmployeeSelect}>
        {employees?.map((e, idx) => (
          <option
            value={e.id}
            key={e.id + idx}
            selected={e.id === role.employee?.id}
          >
            {e.name}
          </option>
        ))}
      </select>

      <button onClick={() => deleteRole(role)}>Delete</button>
    </div>
  );
}
