import type { Project, Role } from "../../../../services/api";
import { useSkills as useSkillsDefault } from "../../../../services/api";
import RoleCard from "../RoleCard";
import Button from "../../../../components/Button";
import RoleModal from "../RoleModal";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { Box, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import DeleteRoleModal from "../DeleteRoleModal";

export default function RoleList({
  project,
  createRole,
  destroyRole,
}: {
  project: Project;
  createRole: (data: Partial<Omit<Role, "id">>) => Promise<string | undefined>;
  destroyRole: (roleId: string) => Promise<void>;
}): JSX.Element {
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const skills = useSkillsDefault();

  const lastRoleIndex = Array.isArray(project?.roles)
    ? project?.roles.length - 1
    : -1;

  return (
    <>
      <Button mb={4} onClick={() => setProjectToEdit(project)}>
        Add Role
      </Button>

      {!isEmpty(project?.roles) && (
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
                {project?.roles?.map((role, index) => (
                  <RoleListRow
                    key={role.id}
                    role={role}
                    lastChild={lastRoleIndex === index}
                    handleDeleteRole={setRoleToDelete}
                  />
                ))}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
      <RoleModal
        isOpen={!isEmpty(projectToEdit)}
        onClose={() => setProjectToEdit(null)}
        skills={skills}
        project={projectToEdit ? projectToEdit : undefined}
        createRole={createRole}
      />

      <DeleteRoleModal
        roleToDelete={roleToDelete}
        setRole={setRoleToDelete}
        destroyRole={destroyRole}
        projectId={project.id}
      />
    </>
  );
}

function RoleListRow({
  role,
  lastChild = false,
  handleDeleteRole,
}: {
  role: Role;
  lastChild: boolean;
  handleDeleteRole: (role: Role) => void;
}) {
  return (
    <>
      <RoleCard role={role} handleDeleteRole={handleDeleteRole} />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
    </>
  );
}
