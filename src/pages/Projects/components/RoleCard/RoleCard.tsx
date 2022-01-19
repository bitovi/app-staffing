import type { Role } from "../../../../services/api";
import { Flex, IconButton, Wrap, Td, Tr, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import Badge from "../../../../components/Badge";
// import { Tag } from "../../../../components/Tag";
import { TrashIcon, EditIcon } from "../../../assets";

interface RoleCardProps {
  roles: Role;
  updateRole: (id: string, role: Role) => void;
  destroyRole: (id: string) => Promise<void>;
}

export default function RoleCard({
  roles,
  updateRole,
  destroyRole,
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
            {roles?.skills?.map((skill) => (
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
            {roles?.startDate && format(roles?.startDate, "MM/dd/yyyy")}
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
            {roles?.startConfidence}
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
            {roles?.endDate && format(roles?.endDate, "MM/dd/yyyy")}
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
            {roles?.endConfidence}
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
            {roles?.assignments[0]?.employee?.name}
          </Text>
        </Td>

        <Td>
          <Flex justifyContent="end" justifySelf="end">
            <IconButton
              variant="editAction"
              aria-label="Edit Member"
              fontSize="20px"
              icon={<EditIcon fill="currentColor" />}
              onClick={() => updateRole(roles.id, roles)}
            />
            <IconButton
              ml="8px"
              variant="deleteAction"
              aria-label="Delete Member"
              fontSize="20px"
              icon={<TrashIcon fill="currentColor" />}
              onClick={() => destroyRole(roles.id)}
            />
          </Flex>
        </Td>
      </Tr>
    </>
  );
}
