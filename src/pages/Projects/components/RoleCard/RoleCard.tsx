import type { Role } from "../../../../services/api";
import { Flex, IconButton, Wrap, Td, Tr, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import Badge from "../../../../components/Badge";
import { TrashIcon, EditIcon } from "../../../assets";

interface RoleCardProps {
  role: Role;
  handleDeleteRole: (role: Role) => void;
}

export default function RoleCard({
  role,
  handleDeleteRole,
}: RoleCardProps): JSX.Element {
  const skillBackgrounds: { [key: string]: string } = {
    Design: "#435BAE",
    UX: "#AE436A",
    Angular: "#876363",
    React: "#61D0D7",
    Node: "#805AD5",
    DevOps: "#5FAE43",
    "UI Designer": "#435BAE",
    "UX Designer": "#AE436A",
    "Project Management": "#B55F10",
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
                background={skillBackgrounds[skill.name]}
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
            {format(role.startDate, "MM/dd/yyyy")}
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
            {role.endDate && format(role.endDate, "MM/dd/yyyy")}
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
            {role.endConfidence && `${role.endConfidence * 100}%`}
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
            >
              {role.assignments[0]?.employee?.name}
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
