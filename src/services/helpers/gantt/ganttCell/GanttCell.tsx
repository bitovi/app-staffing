import { Box, Flex } from "@chakra-ui/react";
import { Assignment, Role } from "../../../api";
import { TimelineRange } from "../../../projection";
import { formatDateToUTC } from "../../utcdate";
import { getStartConfidenceColor } from "../color";
import { v4 as uuidv4 } from "uuid";
interface GantCellProps {
  roleAssignments: Role[] | Assignment[];
  timeline: TimelineRange[];
  index: number;
}

export function GanttCell({
  roleAssignments,
  timeline,
  index,
}: GantCellProps): JSX.Element {
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
    if (isRoleAssignmentInTimeline(roleAssignment, timeline, index)) {
      if ("startConfidence" in roleAssignment) {
        roleAssignment = roleAssignment as Role;
        color = getStartConfidenceColor(roleAssignment.startConfidence);
      } else {
        color = "grey";
      }

      if (index > 0) {
        if (!isRoleAssignmentInTimeline(roleAssignment, timeline, index - 1)) {
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
        if (!isRoleAssignmentInTimeline(roleAssignment, timeline, index + 1)) {
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
  return (
    new Date(roleAssignment.startDate).getTime() <
    timeline[timeline.length - 1].endDate.getTime()
  );
}

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
