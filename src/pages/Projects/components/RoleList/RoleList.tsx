import type { Project, Role } from "../../../../services/api";
import {
  useSkills as useSkillsDefault,

} from "../../../../services/api";
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
  createRole,
}: {
  project: Project;
  createRole: (data: Partial<Omit<Role, "id">>) => Promise<string | undefined>;
}): JSX.Element {
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const skills = useSkillsDefault();

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
        createRole={createRole}
      />
    </>
  );
}

function RoleListRow({
  roles,

  lastChild = false,
}: {
  roles: Role;

  lastChild: boolean;
}) {
  return (
    <>
      <RoleCard
        role={roles}
      />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
    </>
  );
}
