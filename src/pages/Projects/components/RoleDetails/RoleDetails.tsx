import type {
  AssignedEmployee,
  Employee,
  Role,
  SkillName,
} from "../../../../services/api";

import { cloneDeep } from "lodash";

import { skillList, useEmployees } from "../../../../services/api";
import { Button } from "../../../../components/Layout/components/Button";
import AssignedEmployeeDetails from "../AssignedEmployeeDetails";
import RoleDate from "../RoleDate";

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
  const { employees, getEmployeesWithSkill } = useEmployees();

  const createUnassignedEmployee = (): AssignedEmployee => {
    return {
      id: Math.floor(Math.random() * 1000).toString(),
      name: "unassigned",
      startDate: "",
      endDate: "",
      skills: [],
    };
  };

  const createEmployeeChoices = (
    assignedEmployee: AssignedEmployee,
  ): Employee[] => {
    const { assignmentStartDate, assignmnetEndDate, ...employee } =
      assignedEmployee;

    // This list consists of the current assigned employees and any other
    // employee which has the skill but isn't already assigned
    return [
      employee,
      ...getEmployeesWithSkill(role.skill).filter(
        (possibleEmployee) =>
          !role.employees.map(({ id }) => id).includes(possibleEmployee.id),
      ),
    ];
  };

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
        disabled={role.employees.length > 0}
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
        <RoleDate
          title="Start Date"
          estimatedDate={role.startDate}
          onChange={(startDate) => editRole({ ...role, startDate })}
        />
        <RoleDate
          title="End Date"
          estimatedDate={role.endDate}
          onChange={(endDate) => editRole({ ...role, endDate })}
        />
      </div>
      Assigned Employees
      {employees &&
        role.employees.map((assignedEmployee, index) => (
          <AssignedEmployeeDetails
            key={assignedEmployee.id + role.id + index}
            assignedEmployee={assignedEmployee}
            onChange={editAssignedEmployee}
            changeEmployee={changeAssignedEmployee}
            possibleOtherEmployees={createEmployeeChoices(assignedEmployee)}
          />
        ))}
      <Button
        onClick={() =>
          editRole({
            ...role,
            employees: [...role.employees, createUnassignedEmployee()],
          })
        }
      >
        Add Another Team Member
      </Button>
      <Button onClick={() => deleteRole(role)}>Delete</Button>
    </div>
  );
}
