import { Link as ReactRouterLink } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { Link, Box, Flex } from "@chakra-ui/react";
import { skillBackgrounds } from "../../../pages/Dashboard/components/ReportTable/TableRow/TableRow";
import Badge from "../../Badge";
import { Project, Role } from "../../../services/api";
import { TimelineRange } from "../../../services/projection";
import { colors } from "../../../theme/colors";
import { formatDateToUTC } from "../../../services/helpers/utcdate";

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
                alignItems="center"
                borderBottom="1px solid rgba(0, 0, 0, 0.04)"
                key={skill.id}
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
                    <Box
                      textAlign="center"
                      alignSelf="stretch"
                      backgroundColor={
                        index % 2 === 0 ? "rgba(0,0,0,.04)" : "transparent"
                      }
                      flex="1"
                      key={`${!!item}=${index}`}
                    >
                      <Flex width="100%" height="100%">
                        {getGanttCell(role, timeline, index)}
                      </Flex>
                    </Box>
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
  role: Role,
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
function getGanttCell(role: Role, timeline: TimelineRange[], index: number) {
  let color = "transparent";
  const borderRadius = ["0", "0", "0", "0"];
  let width = 100;
  let rightAlign = true; // if true then align the cell right (the starting gantt cell in this case)
  if (isRoleInTimeline(role, timeline, index)) {
    color = getStartConfidenceColor(role.startConfidence);
    if (index > 0) {
      if (!isRoleInTimeline(role, timeline, index - 1)) {
        borderRadius[0] = "8px";
        borderRadius[3] = "8px"; //farthest to the left
        width = calculateGanttCellWidth(role, timeline, index, false);
      } else if (index === timeline.length - 1) {
        rightAlign = false; //farthest to the right
        width = calculateGanttCellWidth(role, timeline, index, true);
      }
    } else {
      // first item in timeline (farthest to the left)
      width = calculateGanttCellWidth(role, timeline, index, false);
      if (width < 100) {
        borderRadius[0] = "8px";
        borderRadius[3] = "8px";
      }
    }
    if (index < timeline.length - 1) {
      if (!isRoleInTimeline(role, timeline, index + 1)) {
        // then last cell shown in timeline (farthest to the right)
        borderRadius[1] = "8px";
        borderRadius[2] = "8px";
        rightAlign = false;
        width = calculateGanttCellWidth(role, timeline, index, true);
      }
    }
  }
  return (
    <Box
      minHeight="18px"
      margin="auto"
      marginLeft={rightAlign ? "auto" : 0}
      marginRight={rightAlign ? 0 : "auto"}
      borderRadius={`${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}`}
      width={`${width}%`}
      opacity={0.7}
      backgroundColor={color}
    />
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
  role: Role,
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
