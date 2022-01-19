import type {
  Project,
  Role,
} from "../../../../services/api";
import { useSkills as useSkillsDefault } from "../../../../services/api";
// import RoleDetails from "../RoleDetails";
import RoleCard from "../RoleCard";
import Button from "../../../../components/Button";
import RoleModal from "../RoleModal";
import { useState } from "react";

import styles from "./RoleList.module.scss";

import { Box, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

export default function RoleList({
  project,
  createRole,
  updateRole,
  destroyRole,
}: {
  project: Project;
  createRole: (data: Partial<Omit<Role, "id">>) => Promise<string | undefined>;
  updateRole: (id: string, project: Role) => Promise<void>;
  destroyRole: (id: string) => Promise<void>;
}): JSX.Element {
  const [roleModal, setRoleModal] = useState<boolean>(false);
  const skills = useSkillsDefault();

  const addNewRole = async (data: Omit<Role, "id">) => {
    await createRole(data);
  };

  const lastRoleIndex = Array.isArray(project?.roles)
    ? project?.roles.length - 1
    : -1;

  return (
    <>
      <Button onClick={() => setRoleModal(true)}>Add Role</Button>
      <div className={styles.skillFilter}>
        {[].map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>

      {project && project.roles.length > 0 && (
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
                    ACTIONS
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
        isOpen={roleModal}
        onClose={() => setRoleModal(false)}
        skills={skills}
        project={project}
        onSave={addNewRole}
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
        roles={roles}
        updateRole={updateRole}
        destroyRole={destroyRole}
      />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
    </>
  );
}
