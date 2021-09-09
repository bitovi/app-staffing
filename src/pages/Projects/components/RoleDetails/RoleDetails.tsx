import type { Role, SkillName } from "../../../../services/api";

// import React from "react";

import { skillList } from "../../../../services/api";

import styles from "./RoleDetails.module.scss";
import AssignedEmployeeDetails from "../AssignedEmployeeDetails";
import ProjectDate from "../RoleDate";

export default function RoleDetails({
  role,
  editRole,
  deleteRole,
}: {
  role: Role;
  editRole: (role: Role) => void;
  deleteRole: (role: Role) => void;
}): JSX.Element {
  return (
    <div className={styles.roleContainer}>
      <div>Role</div>
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
      <div className={styles.dateContainer}>
        <ProjectDate
          title="Start Date"
          estimatedDate={role.startDate}
          onChange={() => null}
        />
        <ProjectDate
          title="End Date"
          estimatedDate={role.endDate}
          onChange={() => null}
        />
      </div>
      Assigned Employees
      {role.employees.map((assignedEmployee) => (
        <AssignedEmployeeDetails
          key={assignedEmployee.id}
          assignedEmployee={assignedEmployee}
          onChange={() => null}
        />
      ))}
      <button onClick={() => deleteRole(role)}>Delete</button>
    </div>
  );
}
