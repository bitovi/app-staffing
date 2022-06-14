import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import { Box, chakra, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
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
  const skillsWithEmployees = useSkills({
    include: [
      "employees.skills",
      "employees.assignments.role.skills",
      "employees.assignments.role.project",
    ],
  });
  const skills = skillsWithEmployees.map((skill) => omit(skill, ["employees"]));
  const employees: Employee[] = useEmployees({ include: "skills" });

  const { createRole, updateRole, destroyRole } = useRoleMutations();
  const {
    createAssignment,
    updateAssignment,
    destroyAssignment,
  } = useAssignmentMutations();

  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const [roleToEdit, setRoleToEdit] = useState<Role>();
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  useEffect(() => {
    if (roleToEdit) {
      setProjectToEdit(project);
    }
  }, [roleToEdit, project]);

  // To update the role data in the edit modal (in case one of the requests results in a server error)
  useEffect(() => {
    if (roleToEdit) {
      setRoleToEdit(project.roles?.find((role) => role.id === roleToEdit.id));
    }
  }, [project, roleToEdit]);

  const lastRoleIndex = Array.isArray(project?.roles)
    ? project?.roles.length - 1
    : -1;

  return (
    <>
      <Box position="sticky" top="13.5em" zIndex="10" backgroundColor="gray.10">
        <Button
          mb={4}
          onClick={() => setProjectToEdit(project)}
          marginInline="40px"
        >
          Add Role
        </Button>
      </Box>

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
        updateAssignment={updateAssignment}
        destroyAssignment={destroyAssignment}
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
  const StickyHeader = chakra(Th, {
    baseStyle: {
      position: "sticky",
      top: "21.5em",
      background: "gray.10",
      zIndex: "10",
    },
  });
  return (
    <Box paddingInline="40px" marginBottom="40px">
      <Table>
        <Thead py={4}>
          <Tr>
            <StickyHeader color="gray.800" textStyle="table.title">
              Roles
            </StickyHeader>
            <StickyHeader color="gray.800" textStyle="table.title">
              Start Date
            </StickyHeader>
            <StickyHeader color="gray.800" textStyle="table.title">
              Confidence
            </StickyHeader>
            <StickyHeader color="gray.800" textStyle="table.title">
              End Date
            </StickyHeader>
            <StickyHeader color="gray.800" textStyle="table.title">
              Confidence
            </StickyHeader>
            <StickyHeader color="gray.800" textStyle="table.title">
              Current Employees
            </StickyHeader>
            <StickyHeader
              py={4}
              pr={12}
              color="gray.800"
              textStyle="table.title"
              isNumeric
            >
              Actions
            </StickyHeader>
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
