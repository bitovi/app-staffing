import type { Role, Project } from "../../../../services/api";

import { cloneDeep } from "lodash";

import { skillList } from "../../../../services/api";
import RoleDetails from "../RoleDetails";
import Button from "../../../../components/Button";

import styles from "./RoleList.module.scss";

export default function RoleList({
  project,
  onEdit,
}: {
  project: Project;
  onEdit: (project: Project) => void;
}): JSX.Element {
  const createNewRole = (): Role => {
    return {
      id: Math.floor(Math.random() * 1000).toString(),
      skill: { name: "Node" },
      startDate: {
        date: undefined,
        confidence: "",
      },
      endDate: {
        date: undefined,
        confidence: "",
      },
      employees: [],
    };
  };

  const editRole = (role: Role) => {
    const roles = cloneDeep(project.roles);
    const index = roles.findIndex(({ id }) => id === role.id);
    roles[index] = role;

    onEdit({
      ...project,
      roles,
    });
  };

  const deleteRole = (role: Role) => {
    onEdit({
      ...project,
      roles: project.roles.filter(({ id }) => id != role.id),
    });
  };

  return (
    <>
      <Button
        onClick={() =>
          onEdit({ ...project, roles: [createNewRole(), ...project.roles] })
        }
      >
        Add Role
      </Button>
      {!project?.roles?.length 
       ?  <div className={styles.noRoles}>There are currently no roles assigned
          to this project, add some</div>
       
       :  <div className={styles.skillFilter}>
        {skillList.map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
      }
      
      {project.roles.map((role) => (
        <RoleDetails
          role={role}
          key={role.id}
          editRole={editRole}
          deleteRole={deleteRole}
        />
      ))}
    </>
  );
}
