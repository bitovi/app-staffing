import React from "react";

import {
  isSkillName,
  Role,
  skillList,
  useEmployees,
} from "../../../../services/api";
import { Select } from "../../../../components/Select";

import styles from "./RoleDetails.module.scss";
import { Button } from "../../../../components/Layout/components/Button";

export default function RoleDetails({
  role,
  editRole,
  deleteRole,
}: {
  role: Role;
  editRole: (role: Role) => void;
  deleteRole: (role: Role) => void;
}): JSX.Element | null {
  const { data: employees } = useEmployees();

  const updateRole = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;

    editRole({ ...role, [name]: value });
  };

  if (!employees) {
    return null;
  }

  return (
    <div className={styles.roleContainer}>
      <div>
        <Select
          label="Role:"
          name="role"
          onChange={(value) =>
            value &&
            isSkillName(value) &&
            editRole({ ...role, skill: { name: value } })
          }
          value={role.skill.name}
          options={skillList.map((name) => ({
            label: name,
            value: name,
          }))}
        />
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
        <Select
          data-testid="role-employee"
          label=""
          name="roleEmployee"
          onChange={(value) => {
            editRole({
              ...role,
              employee: employees.find(({ name }) => name === value),
            });
          }}
          value={role.employee.name}
          options={employees.map(({ name }) => ({
            label: name || "Paul",
            value: name,
          }))}
        />
      )}
      <div>
        <Button onClick={() => deleteRole(role)}>Delete</Button>
      </div>
    </div>
  );
}
