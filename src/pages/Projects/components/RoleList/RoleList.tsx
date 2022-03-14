import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { Box, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import DeleteRoleModal from "../DeleteRoleModal";
import RoleCard from "../RoleCard";
import Button from "../../../../components/Button";
import RoleModal from "../RoleModal";
import {
  Employee,
  Project,
  Role,
  useAssignmentMutations,
  useEmployees,
  useRoleMutations,
  useSkills,
} from "../../../../services/api";

interface RoleListProps {
  project: Project;
}

export default function RoleList({ project }: RoleListProps): JSX.Element {
  const skills = useSkills();
  const employees: Employee[] = useEmployees({ include: "skills" });

  const { createRole, updateRole, destroyRole } = useRoleMutations();
  const { createAssignment } = useAssignmentMutations();

  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const [roleToEdit, setRoleToEdit] = useState<Role>();
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  useEffect(() => {
    if (roleToEdit) {
      setProjectToEdit(project);
    }
  }, [roleToEdit, project]);

  const lastRoleIndex = Array.isArray(project?.roles)
    ? project?.roles.length - 1
    : -1;

  return (
    <>
      <Button mb={4} onClick={() => setProjectToEdit(project)}>
        Add Role
      </Button>

      {isEmpty(project?.roles) ? null : (
        <RolesTable>
          {project?.roles?.map((role, index) => (
            <RoleTableRow
              key={role.id}
              role={role}
              lastChild={lastRoleIndex === index}
              handleDeleteRole={setRoleToDelete}
              handleEditRole={setRoleToEdit}
            />
          ))}
        </RolesTable>
      )}

      <RoleModal
        isOpen={!isEmpty(projectToEdit)}
        onClose={() => setProjectToEdit(null)}
        skills={skills}
        employees={employees}
        project={projectToEdit ? projectToEdit : undefined}
        createRole={createRole}
        createAssignment={createAssignment}
        roleToEdit={roleToEdit}
        setRoleToEdit={setRoleToEdit}
        updateRole={updateRole}
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

function RolesTable({ children }: { children: React.ReactNode }) {
  return (
    <Box maxHeight="75vh" overflowY="auto">
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
        <Tbody>{children}</Tbody>
      </Table>
    </Box>
  );
}

function RoleTableRow({
  role,
  lastChild = false,
  handleDeleteRole,
  handleEditRole,
}: {
  role: Role;
  lastChild: boolean;
  handleDeleteRole: (role: Role) => void;
  handleEditRole: (role: Role) => void;
}) {
  return (
    <>
      <RoleCard
        role={role}
        handleDeleteRole={handleDeleteRole}
        handleEditRole={handleEditRole}
      />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
    </>
  );
}
