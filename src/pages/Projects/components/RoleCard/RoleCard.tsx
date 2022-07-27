import { useState } from "react";
import type { Assignment, Role } from "../../../../services/api";
import { Flex, IconButton, Wrap, Td, Tr, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { formatDateToUTC } from "../../../../services/helpers/utcdate";
import Badge from "../../../../components/Badge";
import { TrashIcon, EditIcon } from "../../../assets";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import DataTimelineHeader from "../../../../components/DataTable/DataTimelineHeader";
import { useTimeline } from "../../../../services/projection";
import DataGanttLine from "../../../../components/DataTable/DataGanttLine";

interface RoleCardProps {
  role: Role;
  handleDeleteRole: (role: Role) => void;
  handleEditRole: (role: Role) => void;
}
const mockRole = {
  id: "5f6a2f57-2f0e-48d7-ac28-1aae14792e57",
  startDate: "Mon Aug 22 2022 00:00:00 GMT-0400 (Eastern Daylight Time)",
  startConfidence: 0.5,
  endDate: "Fri Oct 14 2022 00:00:00 GMT-0400 (Eastern Daylight Time)",
  endConfidence: 0.6,
  projectId: "f9061899-80af-4337-ae32-913edf0f6fed",
  assignments: [
    {
      id: "2f313b76-26c9-4dc1-8708-e964c3ce4b6f",
      employeeId: "0a2b5826-5a56-4f4f-90f6-b8dfbeae6598",
      roleId: "5f6a2f57-2f0e-48d7-ac28-1aae14792e57",
      startDate: "Thu Apr 04 2024 20:00:00 GMT-0400 (Eastern Daylight Time)",
      endDate: "Sun Dec 22 2024 19:00:00 GMT-0500 (Eastern Standard Time)",
      employee: {
        id: "0a2b5826-5a56-4f4f-90f6-b8dfbeae6598",
        name: "Celestino Reilly",
        startDate: "Sun Aug 21 2022 20:00:00 GMT-0400 (Eastern Daylight Time)",
        endDate: null,
      },
    },
  ],
  skills: ['{id: "a8ff7e2b-6097-4914-91a5-7b7ca704eacc", name: …}'],
};

export default function RoleCard({
  role,
  handleDeleteRole,
  handleEditRole,
}: RoleCardProps): JSX.Element {
  const [isExpanded, setExpanded] = useState(false);

  const filterAssignments = (assignments: Assignment[]) => {
    return assignments.filter(
      (assignment) =>
        !assignment.endDate ||
        (assignment.endDate instanceof Date
          ? assignment.endDate.getTime() > new Date().getTime()
          : new Date(assignment.endDate).getTime() > new Date().getTime()),
    );
  };

  const handleExpandRow = () => {
    setExpanded(!isExpanded);
  };

  const { timeline } = useTimeline(new Date());
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
              aria-label="Edit Role"
              fontSize="20px"
              icon={<EditIcon fill="currentColor" />}
              onClick={() => handleEditRole(role)}
            />
            <IconButton
              ml="8px"
              variant="deleteAction"
              aria-label="Delete Role"
              fontSize="20px"
              icon={<TrashIcon fill="currentColor" />}
              onClick={() => handleDeleteRole(role)}
            />
            <IconButton
              ml="8px"
              variant="expandAction"
              aria-label="Expand Role"
              fontSize="40px"
              icon={
                !isExpanded ? (
                  <ChevronDownIcon fill="currentColor" />
                ) : (
                  <ChevronUpIcon fill="currentColor" />
                )
              }
              onClick={() => handleExpandRow()}
            />
          </Flex>
        </Td>
      </Tr>
      {isExpanded && (
        <>
          <Tr p="16px" alignItems="center" backgroundColor="eggshell">
            <Td></Td>
            <Td colSpan={6}>
              <DataTimelineHeader
                heading=""
                headingWidth="0px"
                timeline={timeline}
              />
            </Td>
          </Tr>
          <Tr p="16px" alignItems="center" backgroundColor="eggshell">
            <Td>
              <Text
                color="gray.600"
                fontWeight="700"
                fontSize="14px"
                lineHeight="20px"
                letterSpacing="0.25px"
              >
                Timeline
              </Text>
            </Td>
            <Td colSpan={6}>
              <DataGanttLine timeline={timeline} role={mockRole} />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text
                color="gray.600"
                fontWeight="700"
                fontSize="14px"
                lineHeight="20px"
                letterSpacing="0.25px"
              >
                Assignment
              </Text>
            </Td>
          </Tr>
        </>
      )}
    </>
  );
}
