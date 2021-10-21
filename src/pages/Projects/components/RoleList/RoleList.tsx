import type { Role, Project } from "../../../../services/api";

import { cloneDeep } from "lodash";

import RoleDetails from "../RoleDetails";
import Button from "../../../../components/Button";

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
      {project.roles.map((role) => (
        <RoleDetails
          role={role}
          key={role.id}
          editRole={editRole}
          deleteRole={deleteRole}
        />
      ))}
      {!project.roles.length ? (
        <div data-testid="no-roles">
          There are no roles assigned to this project. Add one!{" "}
        </div>
      ) : null}
    </>
  );
}
