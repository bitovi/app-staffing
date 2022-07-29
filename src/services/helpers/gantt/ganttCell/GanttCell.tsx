import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { Assignment, Role, Skill } from "../../../api";
import { TimelineRange } from "../../../projection";
import { formatDateToUTC } from "../../utcdate";
import { getConfidenceColor } from "../color";
import { v4 as uuidv4 } from "uuid";
import { ProjectHoverInfo } from "../../../../pages/Projects/Projects/components/ProjectHoverInfo/ProjectHoverInfo";
import { AssignmentHoverInfo } from "../../../../pages/Projects/AssignmentHover/AssignmentHoverInfo";
import SplitGantt from "./components/SplitGantt";
interface GantCellProps {
  roleAssignments: Role[] | Assignment[];
  timeline: TimelineRange[];
  index: number; 
  skill: Skill;
}

export function GanttCell({
  roleAssignments,
  timeline,
  index,
  skill,
}: GantCellProps): JSX.Element {
  let split = false;
  let color = "transparent";
  let borderRadius = ["0", "0", "0", "0"];
  let width = 100;
  let rightAlign = true; // if true then align the cell right (the starting gantt cell in this case)
  let skipRow = false;
  const boxes: JSX.Element[] = [];

  // for every role/assignment in the roleAssignments Array:
  for (let i = 0; i < roleAssignments.length; i++) {
    // grab the current one
    let roleAssignment: Role | Assignment = roleAssignments[i];
    skipRow = false;
    // if its not in the the timeline at all, skip
    if (!showInTimeline(roleAssignment, timeline)) {
      skipRow = true;
      continue;
    }
    color = "transparent";
    borderRadius = ["0", "0", "0", "0"];
    width = 100;
    rightAlign = true; // if true then align the cell right (the starting gantt cell in this case)
    const endBar = shouldBeEndConfBar(roleAssignment, timeline, index);
    if (isRoleAssignmentInTimeline(roleAssignment, timeline, index) || endBar) {
      if ("startConfidence" in roleAssignment && !endBar) {
        roleAssignment = roleAssignment as Role;
        color = getConfidenceColor(roleAssignment.startConfidence);
      } else if (endBar) {
        roleAssignment = roleAssignment as Role;
        color = getConfidenceColor(
          roleAssignment.endConfidence || 0,
          "endConfidence",
        );
      } else {
        color = "grey";
      }

      if (index > 0) {
        //check if previous box was empty, if so, round the left corner
        if (
          !isRoleAssignmentInTimeline(roleAssignment, timeline, index - 1) &&
          !shouldBeEndConfBar(roleAssignment, timeline, index - 1)
        ) {
          borderRadius[0] = "8px";
          borderRadius[3] = "8px"; //farthest to the left
          width = calculateGanttCellWidth(
            roleAssignment,
            timeline,
            index,
            false,
          );
        } else if (index === timeline.length - 1) {
          //if we're at the end of the timeline, fill cell

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
        // if we're not at the end yet, check if the NEXT cell would be totally blank. If so, round the RIGHT edge of this.
        if (
          !isRoleAssignmentInTimeline(roleAssignment, timeline, index + 1) &&
          !shouldBeEndConfBar(roleAssignment, timeline, index + 1)
        ) {
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
        // if we're at the end of the START confidence, but end confidence < 1, create split Gantt cell
        if (
          getConfidenceLevel("end", roleAssignment) < 1 && 
          !isRoleAssignmentInTimeline(roleAssignment, timeline, index + 1) &&
          isRoleAssignmentInTimeline(roleAssignment, timeline, index)
        ) {
          width = calculateGanttCellWidth(
            roleAssignment,
            timeline,
            index,
            true,
          );
          split = true;
        }
      }
      if ("startConfidence" in roleAssignment) {
        boxes.push(
          <Tooltip
            minWidth="400px"
            height="fit-content"
            hasArrow
            key={`${roleAssignment.id}-tooltip-${boxes.length}`}
            placement="top"
            label={
              <ProjectHoverInfo role={roleAssignment as Role} skill={skill} />
            }
            aria-label="project start and end tooltip"
          >
            {split ? (
              <SplitGantt
                width={width}
                startConfidence={roleAssignment.startConfidence}
                endConfidence={roleAssignment?.endConfidence || 0}
              />
            ) : (
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
            )}
          </Tooltip>,
        );
      } else {
        boxes.push(
          <Tooltip
            height="fit-content"
            hasArrow
            placement="top"
            key={`${roleAssignment.id}-tooltip-${boxes.length}`}
            label={
              <AssignmentHoverInfo
                skill={skill}
                assignment={roleAssignment as Assignment}
              />
            }
            aria-label="assignment start and end tooltip"
          >
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
          </Tooltip>,
        );
      }
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
function isRoleAssignmentInTimeline(
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
function showInTimeline(
  roleAssignment: Role | Assignment,
  timeline: TimelineRange[],
) {
  if (!roleAssignment) {
    return false;
  }

  let shouldEnd = false;

  if ("endConfidence" in roleAssignment) {
    roleAssignment.endConfidence === 1
      ? (shouldEnd = true)
      : (shouldEnd = false);
  }

  const roleStart = new Date(roleAssignment.startDate).getTime();
  const roleEnd = new Date(roleAssignment.endDate as string | Date).getTime();
  const tlStart = new Date(timeline[0].startDate).getTime();
  const tlEnd = new Date(timeline[timeline.length - 1].endDate).getTime();

  if (roleEnd < tlStart && shouldEnd) {
    return false;
  } else if (tlEnd < roleStart) {
    return false;
  } else {
    return true;
  }
}
const getConfidenceLevel = (
  confidenceType: string,
  roleAssignment: Role | Assignment,
): number => {
  if (confidenceType === "start") {
    if ("startConfidence" in roleAssignment) {
      return roleAssignment.startConfidence;
    } else {
      return 0;
    }
  } else if (confidenceType === "end") {
    if ("endConfidence" in roleAssignment) {
      return roleAssignment.endConfidence ? roleAssignment.endConfidence : 0;
    } else return 0;
  } else {
    return 0;
  }
};
const shouldBeEndConfBar = (
  roleAssignment: Role | Assignment,
  timeline: TimelineRange[],
  index: number,
) => {
  const roleEnd =
    (roleAssignment.endDate && formatDateToUTC(roleAssignment.endDate)) || 0;
  const tlEnd = formatDateToUTC(timeline[index].endDate);
  const confidence = getConfidenceLevel("end", roleAssignment);
  if (roleEnd < tlEnd && confidence < 1) {
    return true;
  } else {
    return false;
  }
};

export function groupAssignments(
  assignments: Assignment[],
  timeline: TimelineRange[],
): [Assignment[]] {
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

export default GanttCell;
