import type {
  // AssignedEmployee,
  // Employee,
  Role,
  Skill,
} from "../../../../services/api";
import { /** useEmployees, */ useSkills } from "../../../../services/api";

// import { cloneDeep } from "lodash";
import Button from "../../../../components/Button";
import Select from "../../../../components/Select";
// import AssignedEmployeeDetails from "../AssignedEmployeeDetails";
import RoleDate from "../RoleDate";

import styles from "./RoleDetails.module.scss";

export default function RoleDetails({
  role,
  updateRole,
  destroyRole,
}: {
  role: Role;
  updateRole: (id: string, role: Role) => void;
  destroyRole: (id: string) => void;
}): JSX.Element {
  // const employees = useEmployees();
  const skills = useSkills();

  // const createUnassignedEmployee = (): AssignedEmployee => {
  //   return {
  //     employee: {
  //       id: Math.floor(Math.random() * 1000).toString(),
  //       name: "unassigned",
  //       startDate: new Date(),
  //       skills: [],
  //     },
  //   };
  // };

  // const createEmployeeChoices = (
  //   assignedEmployee: AssignedEmployee,
  // ): Employee[] => {
  //   // This list consists of the current assigned employees and any other
  //   // employee which has the skill but isn't already assigned
  //   return [
  //     // assignedEmployee.employee,
  //     // ...(employees || [])
  //     //   .filter(({ skills }) =>
  //     //     skills.map(({ name }) => name).includes(role.skill.name),
  //     //   )
  //     //   .filter(
  //     //     (employee) =>
  //     //       !role.employees
  //     //         .map(({ employee: { id } }: { employee: { id: string } }) => id)
  //     //         .includes(employee.id),
  //     //   ),
  //   ];
  // };

  // const editAssignedEmployee = (assignedEmployee: AssignedEmployee) => {
  //   const employees = cloneDeep(role?.employees || []);
  //   const index = employees.findIndex(
  //     ({ employee: { id } }: { employee: { id: string } }) =>
  //       id === assignedEmployee.employee.id,
  //   );

  //   employees[index] = assignedEmployee;

  //   updateRole(role.id, {
  //     ...role,
  //     employees,
  //   });
  // };

  // const changeAssignedEmployee = (
  //   previousId: string,
  //   newAssignedEmployee: AssignedEmployee,
  // ) => {
  //   const employees = cloneDeep(role.employees);
  //   const index = employees.findIndex(
  //     ({ employee: { id } }: { employee: { id: string } }) => id === previousId,
  //   );

  //   employees[index] = newAssignedEmployee;

  //   updateRole({
  //     ...role,
  //     employees,
  //   });
  // };

  return (
    <div className={styles.roleContainer}>
      <div className={styles.header}>
        {skills && (
          <Select<Skill>
            label="Role"
            name="roleSkill"
            onChange={(skill?: Skill) =>
              skill &&
              updateRole(role.id, {
                ...role,
                skills: [...(role?.skills || []), skill],
              })
            }
            value={role?.skills?.[0]}
            options={skills.map((skill) => ({
              label: skill.name,
              value: skill,
            }))}
          />
        )}
        <div className={styles.dateContainer}>
          <RoleDate
            title="Start Date"
            date={role.startDate}
            confidence={role.startConfidence}
            onChange={({ date: startDate, confidence: startConfidence }) =>
              updateRole(role.id, {
                ...role,
                startDate: startDate || role.startDate,
                startConfidence: startConfidence || role.startConfidence,
              })
            }
          />
          <RoleDate
            title="End Date"
            date={role.endDate}
            confidence={role.endConfidence}
            onChange={({ date: endDate, confidence: endConfidence }) =>
              updateRole(role.id, {
                ...role,
                endDate: endDate || role.endDate,
                endConfidence: endConfidence || role.endConfidence,
              })
            }
          />
        </div>
      </div>
      <div className={styles.employees}>
        Assigned Employees
        {/* {employees &&
          role.employees.map(
            (assignedEmployee: AssignedEmployee, index: number) => (
              <AssignedEmployeeDetails
                key={assignedEmployee.employee.id + role.id + index}
                assignedEmployee={assignedEmployee}
                onChange={editAssignedEmployee}
                changeEmployee={changeAssignedEmployee}
                possibleOtherEmployees={createEmployeeChoices(assignedEmployee)}
              />
            ),
          )} */}
      </div>
      <div className={styles.controls}>
        {/* <Button
          className={styles.button}
          onClick={() =>
            updateRole(role.id, {
              ...role,
              employees: [...role.employees, createUnassignedEmployee()],
            })
          }
        >
          Add Another Team Member
        </Button> */}
        <Button className={styles.button} onClick={() => destroyRole(role.id)}>
          Delete Role
        </Button>
      </div>
    </div>
  );
}
