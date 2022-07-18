import { Link as ReactRouterLink } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { Link, Box, Flex, Tooltip } from "@chakra-ui/react";
import { skillBackgrounds } from "../../../pages/Dashboard/components/ReportTable/TableRow/TableRow";
import Badge from "../../Badge";
import { Assignment, Project, Role } from "../../../services/api";
import { TimelineRange } from "../../../services/projection";
import { colors } from "../../../theme/colors";
import { formatDateToUTC } from "../../../services/helpers/utcdate";
import { HoverInfo } from "../../../pages/Projects/Projects/components/ProjectHoverInfo/ProjectHoverInfo";
import { v4 as uuidv4 } from "uuid";
interface PropjectCardProps {
  project: Project;
  timeline?: TimelineRange[];
}

const DataTableBody = ({
  project,
  timeline = [],
}: PropjectCardProps): JSX.Element => {
  return (
    <Box
      backgroundColor="#FFFFFF"
      borderRadius="4px"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      key={project.id}
      margin="15px 51px"
    >
      <Flex
        backgroundColor="#EDF2F7"
        borderRadius="4px 4px 0px 0px"
        justify="space-between"
        padding="6px 10px"
      >
        <Text fontWeight="600">{project.name}</Text>
        <Link
          to={`/projects/${project.id}`}
          as={ReactRouterLink}
          color="teal.500"
          fontWeight="bold"
          textDecoration="underline"
          _hover={{ textDecoration: "none" }}
        >
          View Project Detail
        </Link>
      </Flex>

      <Flex direction="column">
        {project?.roles?.map((role) => (
          <Box key={role.id}>
            {role?.skills?.map((skill) => (
              <Flex
                key={skill.id}
                alignItems="center"
                borderBottom="1px solid rgba(0, 0, 0, 0.04)"
                minHeight="50px"
              >
                <Flex
                  alignItems="center"
                  alignSelf="stretch"
                  flex="0 1 150px"
                  justify="center"
                  padding="0 16px"
                >
                  <Badge
                    background={skillBackgrounds[skill.name]}
                    display="flex"
                    isTruncated={false}
                    maxWidth="100px"
                    size="sm"
                    textAlign="center"
                    whiteSpace="break-spaces"
                  >
                    {skill.name}
                  </Badge>
                </Flex>

                {timeline.map((item: TimelineRange, index: number) => {
                  return (
                    <Tooltip
                      minWidth="400px"
                      height="fit-content"
                      hasArrow
                      key={`${!!item}=${index}`}
                      placement="top"
                      label={<HoverInfo role={role} skill={skill} />}
                      aria-label="project start and end tooltip"
                    >
                      <Box
                        textAlign="center"
                        alignSelf="stretch"
                        backgroundColor={
                          index % 2 === 0 ? "rgba(0,0,0,.04)" : "transparent"
                        }
                        flex="1"
                      >
                        <Flex marginTop="14px" flexDirection="column">
                          {getGanttCell([role], timeline, index)}
                        </Flex>
                        <Flex title="role/assignments" flexDirection="column">
                          {role.assignments &&
                            role.assignments.length > 0 &&
                            groupAssignments(role.assignments, timeline).map(
                              (assignments: Assignment[]) => {
                                return getGanttCell(
                                  assignments,
                                  timeline,
                                  index,
                                );
                              },
                            )}
                        </Flex>
                      </Box>
                    </Tooltip>
                  );
                })}
              </Flex>
            ))}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default DataTableBody;

function isRoleInTimeline(
  role: Role | Assignment,
  timeline: TimelineRange[],
  index: number,
): boolean {
  role.startDate = formatDateToUTC(role.startDate);
  if (role.endDate) {
    role.endDate = formatDateToUTC(role.endDate);
  }
  timeline[index].startDate = formatDateToUTC(timeline[index].startDate);
  timeline[index].endDate = formatDateToUTC(timeline[index].endDate);
  if (role.startDate < timeline[index].endDate) {
    if (role.endDate) {
      if (role.endDate > timeline[index].startDate) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  return false;
}
function getGanttCell(
  roleAssignments: Role[] | Assignment[],
  timeline: TimelineRange[],
  index: number,
) {
  let color = "transparent";
  let borderRadius = ["0", "0", "0", "0"];
  let width = 100;
  let rightAlign = true; // if true then align the cell right (the starting gantt cell in this case)
  let skipRow = false;
  const boxes: JSX.Element[] = [];
  for (let i = 0; i < roleAssignments.length; i++) {
    let roleAssignment: Role | Assignment = roleAssignments[i];
    skipRow = false;
    if (!showInTimeline(roleAssignment, timeline)) {
      skipRow = true;
      continue;
    }
    color = "transparent";
    borderRadius = ["0", "0", "0", "0"];
    width = 100;
    rightAlign = true; // if true then align the cell right (the starting gantt cell in this case)
    if (isRoleInTimeline(roleAssignment, timeline, index)) {
      if ("startConfidence" in roleAssignment) {
        roleAssignment = roleAssignment as Role;
        color = getStartConfidenceColor(roleAssignment.startConfidence);
      } else {
        color = "grey";
      }

      if (index > 0) {
        if (!isRoleInTimeline(roleAssignment, timeline, index - 1)) {
          borderRadius[0] = "8px";
          borderRadius[3] = "8px"; //farthest to the left
          width = calculateGanttCellWidth(
            roleAssignment,
            timeline,
            index,
            false,
          );
        } else if (index === timeline.length - 1) {
          rightAlign = false; //farthest to the right
          width = calculateGanttCellWidth(
            roleAssignment,
            timeline,
            index,
            true,
          );
        }
      } else {
        // first item in timeline (farthest to the left)
        width = calculateGanttCellWidth(roleAssignment, timeline, index, false);
        if (width < 100) {
          borderRadius[0] = "8px";
          borderRadius[3] = "8px";
        }
      }
      if (index < timeline.length - 1) {
        if (!isRoleInTimeline(roleAssignment, timeline, index + 1)) {
          // then last cell shown in timeline (farthest to the right)
          borderRadius[1] = "8px";
          borderRadius[2] = "8px";
          rightAlign = false;
          width = calculateGanttCellWidth(
            roleAssignment,
            timeline,
            index,
            true,
          );
        }
      }
      boxes.push(
        <Box
          key={`${roleAssignment.id}-${boxes.length}`}
          minHeight="18px"
          margin="auto"
          marginLeft={rightAlign ? "auto" : 0}
          marginRight={rightAlign ? 0 : "auto"}
          borderRadius={`${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}`}
          width={`${width}%`}
          opacity={0.7}
          backgroundColor={color}
        />,
      );
    }
  }
  if (!boxes.length && !skipRow) {
    const id = uuidv4();
    boxes.push(
      <Box
        key={`${id}-${boxes.length}`}
        minHeight="18px"
        margin="auto"
        marginLeft={rightAlign ? "auto" : 0}
        marginRight={rightAlign ? 0 : "auto"}
        borderRadius={`${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}`}
        width={`${width}%`}
        opacity={0.7}
        backgroundColor={color}
      />,
    );
  }
  const id = uuidv4();
  return (
    <Flex key={`${id}-${boxes.length}`} marginBottom="8px">
      {boxes.map((box) => box)}
    </Flex>
  );
}

function getStartConfidenceColor(startConfidence: number) {
  startConfidence = Math.round(startConfidence * 10) * 10;
  switch (startConfidence) {
    case 0:
      return colors.start_confidence[0];
    case 10:
      return colors.start_confidence[10];
    case 20:
      return colors.start_confidence[20];
    case 30:
      return colors.start_confidence[30];
    case 40:
      return colors.start_confidence[40];
    case 50:
      return colors.start_confidence[50];
    case 60:
      return colors.start_confidence[60];
    case 70:
      return colors.start_confidence[70];
    case 80:
      return colors.start_confidence[80];
    case 90:
      return colors.start_confidence[90];
    case 100:
      return colors.start_confidence[100];
    default:
      return colors.start_confidence[0];
  }
}

function calculateGanttCellWidth(
  role: Role | Assignment,
  timeline: TimelineRange[],
  index: number,
  useEndDate: boolean,
) {
  let start: Date = timeline[index].startDate;
  let end: Date = timeline[index].endDate;
  let dateBetween: Date = new Date(role.startDate);
  // then flip vars used in the calculation because we are calculating from the opposite end
  if (role.endDate && useEndDate) {
    dateBetween = new Date(role.endDate);
    start = end;
    end = timeline[index].startDate;
  }
  let width = Math.round(
    ((dateBetween.getTime() - end.getTime()) /
      (start.getTime() - end.getTime())) *
      100,
  );
  if (width < 0 || width > 100) {
    width = 100;
  }
  return width;
}

function groupAssignments(
  assignments: Assignment[],
  timeline: TimelineRange[],
) {
  // loop through assignment
  // if start date is greater than end date of previous group together
  assignments = assignments.filter((assignment: Assignment) => {
    return showInTimeline(assignment, timeline);
  });
  assignments.sort(
    (a: Assignment, b: Assignment) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
  //sort by start date
  const groupedAssignments: [Assignment[]] = [[assignments[0]]];
  for (let i = 1; i < assignments.length; i++) {
    const assignment = assignments[i];
    groupedAssignments[groupedAssignments.length - 1].sort(
      (a: Assignment, b: Assignment) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
    let doneLoop = false;
    for (let j = 0; j < groupedAssignments.length; j++) {
      const lastAssignment =
        groupedAssignments[j][groupedAssignments[j].length - 1];
      if (lastAssignment && lastAssignment.endDate) {
        const curEnddate: Date = new Date(lastAssignment.endDate);
        if (new Date(assignment.startDate).getTime() > curEnddate.getTime()) {
          groupedAssignments[j].push(assignment);
          doneLoop = true;
          continue;
        }
      }
    }
    if (doneLoop) {
      continue;
    }
    groupedAssignments.push([assignment]);
  }
  return groupedAssignments;
}

function showInTimeline(
  roleAssignment: Role | Assignment,
  timeline: TimelineRange[],
) {
  if (!roleAssignment) {
    return false;
  }
  return (
    new Date(roleAssignment.startDate).getTime() <
    timeline[timeline.length - 1].endDate.getTime()
  );
}
