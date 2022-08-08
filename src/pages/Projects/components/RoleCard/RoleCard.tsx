import { useState } from "react";
import type { Assignment, Role } from "../../../../services/api";
import { Flex, IconButton, Wrap, Td, Tr, Text, Box } from "@chakra-ui/react";
import { format } from "date-fns";
import { formatDateToUTC } from "../../../../services/helpers/utcdate";
import Badge from "../../../../components/Badge";
import { TrashIcon, EditIcon } from "../../../assets";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import DataTimelineHeader from "../../../../components/DataTable/DataTimelineHeader";
import { TimelineRange, useTimeline } from "../../../../services/projection";
import GanttCell, {
  getRolesAsRow,
} from "../../../../services/helpers/gantt/ganttCell";

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
              <Box>
                <Flex
                  alignItems="center"
                  borderBottom="1px solid rgba(0,0,0,0,04)"
                  minHeight="50px"
                >
                  {timeline.map((item: TimelineRange, index: number) => {
                    return (
                      <Box
                        textAlign="center"
                        alignSelf="stretch"
                        key={`gantt-cell-project-${role.id}-${index}`}
                        backgroundColor={
                          index % 2 === 0 ? "rgba(0,0,0,.04)" : "transparent"
                        }
                        flex="1"
                      >
                        <Flex marginTop="14px" flexDirection="column">
                          <GanttCell
                            roleAssignments={getRolesAsRow(role)}
                            timeline={timeline}
                            index={index}
                            // role should only ever have one skill
                            skill={role.skills[0]}
                          />
                        </Flex>
                      </Box>
                    );
                  })}
                </Flex>
              </Box>
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
