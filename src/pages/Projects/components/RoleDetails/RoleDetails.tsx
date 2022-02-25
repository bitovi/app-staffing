import isUndefined from "lodash/isUndefined";

import type { Assignment, Role, Skill } from "../../../../services/api";
import { useSkills } from "../../../../services/api";
import Button from "../../../../components/Button";
import Select from "../../../../components/Select";
import RoleAssignment from "../RoleAssignment";
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
  const skills = useSkills();

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
            onConfidenceChange={(startConfidence) => {
              if (!isUndefined(startConfidence)) {
                updateRole(role.id, { ...role, startConfidence });
              }
            }}
            onDateChange={(startDate) => {
              if (!isUndefined(startDate)) {
                updateRole(role.id, { ...role, startDate });
              }
            }}
          />
          <RoleDate
            title="End Date"
            date={role.endDate}
            confidence={role.endConfidence}
            onConfidenceChange={(endConfidence) =>
              updateRole(role.id, { ...role, endConfidence })
            }
            onDateChange={(endDate) =>
              updateRole(role.id, { ...role, endDate })
            }
          />
        </div>
      </div>
      <div className={styles.employees}>
        Assigned Employees
        {role.assignments &&
          role.assignments.map((assignment: Assignment, index: number) => (
            <RoleAssignment
              key={assignment.id + index}
              assignment={assignment}
            />
          ))}
      </div>
      <div className={styles.controls}>
        <Button className={styles.button} onClick={() => alert("todo")}>
          Edit
        </Button>
        <Button className={styles.button} onClick={() => destroyRole(role.id)}>
          Delete Role
        </Button>
      </div>
    </div>
  );
}
