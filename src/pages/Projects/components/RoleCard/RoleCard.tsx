import type { Assignment, Role } from "../../../../services/api";
import { Flex, IconButton, Wrap, Td, Tr, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { formatDateToUTC } from "../../../../services/helpers/utcdate";
import Badge from "../../../../components/Badge";
import { TrashIcon, EditIcon } from "../../../assets";

interface RoleCardProps {
  role: Role;
  handleDeleteRole: (role: Role) => void;
  handleEditRole: (role: Role) => void;
}

export default function RoleCard({
  role,
  handleDeleteRole,
  handleEditRole,
}: RoleCardProps): JSX.Element {
  const filterAssignments = (assignments: Assignment[]) => {
    return assignments.filter(
      (assignment) =>
        !assignment.endDate ||
        (assignment.endDate instanceof Date
          ? assignment.endDate.getTime() > new Date().getTime()
          : new Date(assignment.endDate).getTime() > new Date().getTime()),
    );
  };

  return (
    <>
      <Tr
        p="16px"
        alignItems="center"
        backgroundColor="white"
        boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      >
        <Td>
          <Wrap spacing="8px">
            {role?.skills?.map((skill) => (
              <Badge
                size="sm"
                background={`skills.${skill.name}`}
                key={skill.id}
              >
                {skill.name}
              </Badge>
            ))}
          </Wrap>
        </Td>
        <Td>
          <Text
            color="gray.600"
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {format(formatDateToUTC(role.startDate), "MM/dd/yyyy")}
          </Text>
        </Td>
        <Td>
          <Text
            color="gray.600"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {`${role.startConfidence * 100}%`}
          </Text>
        </Td>
        <Td>
          <Text
            color="gray.600"
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {role.endDate &&
              format(formatDateToUTC(role.endDate), "MM/dd/yyyy")}
          </Text>
        </Td>
        <Td>
          <Text
            color="gray.600"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {typeof role.endConfidence === "number" &&
              `${role.endConfidence * 100}%`}
          </Text>
        </Td>
        <Td>
          {role.assignments && (
            <Text
              color="gray.600"
              fontWeight="600"
              fontSize="16px"
              lineHeight="20px"
              letterSpacing="0.25px"
              data-testid="assignments-column"
            >
              {filterAssignments(role.assignments).map(
                (assignment, index) =>
                  `${index ? ", " : ""}${assignment?.employee?.name || ""}`,
              )}
            </Text>
          )}
        </Td>

        <Td>
          <Flex justifyContent="end" justifySelf="end">
            <IconButton
              variant="editAction"
              aria-label="Edit Member"
              fontSize="20px"
              icon={<EditIcon fill="currentColor" />}
              onClick={() => handleEditRole(role)}
            />
            <IconButton
              ml="8px"
              variant="deleteAction"
              aria-label="Delete Member"
              fontSize="20px"
              icon={<TrashIcon fill="currentColor" />}
              onClick={() => handleDeleteRole(role)}
            />
          </Flex>
        </Td>
      </Tr>
    </>
  );
}
