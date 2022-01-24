import type {
  Project,
  Role,
} from "../../../../services/api";
import { useSkills as useSkillsDefault, useRoles as useRolesDefault } from "../../../../services/api";
// import RoleDetails from "../RoleDetails";
import RoleCard from "../RoleCard";
import Button from "../../../../components/Button";
import RoleModal from "../RoleModal";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import styles from "./RoleList.module.scss";

import { Box, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

export default function RoleList({
  project,
  updateProject,
  createRole,
  updateRole,
  destroyRole,
}: {
  project: Project;
  updateProject: (id: string, data: Project) => void;
  createRole: (data: Omit<Role, "id">) => Promise<string | undefined>;
  updateRole: (id: string, project: Role) => Promise<void>;
  destroyRole: (id: string) => Promise<void>;
}): JSX.Element {
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const skills = useSkillsDefault();
  const roles = useRolesDefault();

  const addNewRole = async (data: Omit<Role, "id">) => {
    await createRole(data);
  };

  const submitUpdateProject = async (projectToUpdate: Project) => {
    if (projectToEdit) {
      const id = projectToEdit.id;
      debugger;
      await updateProject(id, projectToUpdate);
    }
  };


  const lastRoleIndex = Array.isArray(project?.roles)
    ? project?.roles.length - 1
    : -1;

  return (
    <>
      <Button onClick={() => setProjectToEdit(project)}>Add Role</Button>
      <div className={styles.skillFilter}>
        {[].map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>

      {project && project?.roles && project.roles.length > 0 && (
        <>
          <Box maxHeight="80vh" overflowY="auto">
            <Table>
              <Thead py={4}>
                <Tr>
                  <Th color="gray.800" textStyle="table.title">
                    Roles
                  </Th>
                  <Th color="gray.800" textStyle="table.title">
                    Start Date
                  </Th>
                  <Th color="gray.800" textStyle="table.title">
                    Confidence
                  </Th>
                  <Th color="gray.800" textStyle="table.title">
                    End Date
                  </Th>
                  <Th color="gray.800" textStyle="table.title">
                    Confidence
                  </Th>
                  <Th color="gray.800" textStyle="table.title">
                    Current Employees
                  </Th>
                  <Th
                    py={4}
                    pr={12}
                    color="gray.800"
                    textStyle="table.title"
                    isNumeric
                  >
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {project?.roles.map((role, index) => (
                  <RoleListRow
                    key={role.id}
                    updateRole={updateRole}
                    destroyRole={destroyRole}
                    roles={role}
                    lastChild={lastRoleIndex === index}
                  />
                ))}
              </Tbody>
            </Table>
          </Box>
        </>
      )}

      {/* {project?.roles?.map((role) => (
        <RoleDetails
          key={role.id}
          role={role}
          updateRole={updateRole}
          destroyRole={destroyRole}
        />
      ))} */}
      <RoleModal
        isOpen={!isEmpty(projectToEdit)}
        onClose={() => setProjectToEdit(null)}
        skills={skills}
        project={projectToEdit ? projectToEdit : undefined}
        createRole={addNewRole}
        onSave={(project) => submitUpdateProject(project as Project)}
        roles={roles}
      />
    </>
  );
}

function RoleListRow({
  roles,
  updateRole,
  destroyRole,
  lastChild = false,
}: {
  roles: Role;
  updateRole: (id: string, role: Role) => void;
  destroyRole: (id: string) => Promise<void>;
  lastChild: boolean;
}) {
  return (
    <>
      <RoleCard
        role={roles}
        updateRole={updateRole}
        destroyRole={destroyRole}
      />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
    </>
  );
}
