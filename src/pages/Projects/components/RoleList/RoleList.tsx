import type { Project, Role } from "../../../../services/api";
import { useSkills as useSkillsDefault } from "../../../../services/api";
import RoleCard from "../RoleCard";
import Button from "../../../../components/Button";
import RoleModal from "../RoleModal";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
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
                    roles={role}
                    lastChild={lastRoleIndex === index}
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
      <RoleCard role={roles} />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
    </>
  );
}
