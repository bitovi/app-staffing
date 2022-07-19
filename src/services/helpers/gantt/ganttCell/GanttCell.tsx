import { Box } from "@chakra-ui/react";
import { Role } from "../../../api";
import { TimelineRange } from "../../../projection";
import { formatDateToUTC } from "../../utcdate";
import { getStartConfidenceColor } from "../color";

interface GantCellProps {
  role: Role;
  timeline: TimelineRange[];
  index: number;
  id?: string;
}

export function GanttCell({
  role,
  timeline,
  index,
  id,
}: GantCellProps): JSX.Element {
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
      id={id}
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

export default GanttCell;
