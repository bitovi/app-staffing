import { Box, Center, Flex } from "@chakra-ui/react";
import differenceInDays from "date-fns/differenceInDays";
import max from "date-fns/esm/max";
import min from "date-fns/esm/min";
import { Assignment, Role } from "../../../api";
import { TimelineRange } from "../../timeline";

const LineChart = ({
  data,
  timeline,
  isRole,
}: {
  data: Role | Assignment;
  timeline: TimelineRange[];
  isRole?: boolean;
}): JSX.Element => {
  let isUnbound = false;
  let startTime = 0;
  let duration = 0;
  let totalNumOfDays = 0;

  const roleStart = data.startDate;
  let roleEnd = data.endDate;

  if (!roleEnd) {
    roleEnd = timeline[timeline.length - 1].endDate;
    isUnbound = true;
  }

  for (const [index, period] of timeline.entries()) {
    const { startDate: periodStart, endDate: periodEnd } = period;
    const numOfDays = Math.round(
      Math.abs(
        (periodStart.valueOf() - periodEnd.valueOf()) / (24 * 60 * 60 * 1000),
      ),
    );
    totalNumOfDays += numOfDays;
    if (periodEnd < roleStart) {
      continue;
    }
    if (periodStart > roleEnd) {
      break;
    }

    if (!startTime) {
      startTime =
        (differenceInDays(roleStart, timeline[0].startDate) * (index + 1)) /
        totalNumOfDays;
    }

    const start = max([periodStart, roleStart]);
    const end = min([periodEnd, roleEnd]);

    duration += (differenceInDays(end, start) + 1) / numOfDays;
  }

  return (
    <Flex flex={1} height={8} mb={2} alignItems={"start"}>
      <Center width="3xs" justifyContent={"start"}></Center>

      <Box style={{ position: "relative" }}>
        {isRole && (
          <span
            style={{
              position: "absolute",
              fontSize: "12px",
              fontWeight: "bold",
              marginTop: "5px",
              marginLeft: `calc(${startTime} * 11vw)`,
            }}
          >
            {"startConfidence" in data && `${data.startConfidence * 100}%`}
          </span>
        )}
        <Box
          background={isRole ? "blue" : "red"}
          ml={`calc(${startTime} * 11vw)`}
          h={1}
          w={
            isUnbound ? `calc(${duration} * 5rem)` : `calc(${duration} * 11vw)`
          }
        />
        {isUnbound && (
          <Box
            style={{
              width: 0,
              height: 0,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: "10px solid black",
              borderLeftColor: isRole ? "blue" : "red",
              position: "absolute",
              right: -2,
              top: "-8px",
            }}
          />
        )}
        {isRole && (
          <span
            style={{
              position: "absolute",
              fontSize: "12px",
              fontWeight: "bold",
              marginTop: "1px",
              right: 0,
            }}
          >
            {"endConfidence" in data &&
              data.endConfidence &&
              `${data.endConfidence * 100}%`}
          </span>
        )}
      </Box>

      <Box w={28} />
    </Flex>
  );
};

export default LineChart;
