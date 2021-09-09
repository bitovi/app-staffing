import type {
  AssignedEmployee,
  Role,
  SkillName,
} from "../../../../services/api";

import cloneDeep from "lodash.clonedeep";

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
  const editAssignedEmployee = (assignedEmployee: AssignedEmployee) => {
    const employees = cloneDeep(role.employees);
    const index = employees.findIndex(({ id }) => id === assignedEmployee.id);

    employees[index] = assignedEmployee;

    editRole({
      ...role,
      employees,
    });
  };

  const changeAssignedEmployee = (
    previousId: string,
    newAssignedEmployee: AssignedEmployee,
  ) => {
    const employees = cloneDeep(role.employees);
    const index = employees.findIndex(({ id }) => id === previousId);

    employees[index] = newAssignedEmployee;

    editRole({
      ...role,
      employees,
    });
  };

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
          <option key={name + role.id} value={name}>
            {name}
          </option>
        ))}
      </select>
      <div className={styles.dateContainer}>
        <ProjectDate
          title="Start Date"
          estimatedDate={role.startDate}
          onChange={(startDate) => editRole({ ...role, startDate })}
        />
        <ProjectDate
          title="End Date"
          estimatedDate={role.endDate}
          onChange={(endDate) => editRole({ ...role, endDate })}
        />
      </div>
      Assigned Employees
      {role.employees.map((assignedEmployee) => (
        <AssignedEmployeeDetails
          key={assignedEmployee.id + role.id}
          assignedEmployee={assignedEmployee}
          onChange={editAssignedEmployee}
          changeEmployee={changeAssignedEmployee}
        />
      ))}
      <button onClick={() => deleteRole(role)}>Delete</button>
    </div>
  );
}
