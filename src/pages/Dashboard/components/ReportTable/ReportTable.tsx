import type { TimelineData } from "../../../../services/timeline";

import React, { useMemo } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { Center, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";

import {
  getTimeline,
  TimescaleType,
  getTimelineDataDescription,
} from "../../../../services/timeline";

import TableRow from "./TableRow";
import { useProjection } from "../../../../services/api/useProjection";

interface IProps {
  reportDate?: Date;
}

export function ReportTable({ reportDate = new Date() }: IProps): JSX.Element {
  const timeFrames: TimelineData[] = useMemo(
    () => getTimeline(reportDate),
    [reportDate],
  );

  const { projectedData } = useProjection();
  const columnHeading: string[] = timeFrames.map(getTimelineDataDescription);

  return (
    <Flex flexDirection="column">
      <Flex flex={1} height={8} mb={7} alignItems={"start"}>
        <Center width="3xs" justifyContent={"start"}>
          <Text textStyle="tableHead">DEPARTMENT</Text>
        </Center>

        {/* Table Heading */}
        {columnHeading.map((item, index) => {
          return (
            <Center
              flex={1}
              key={index}
              alignItems={"end"}
              flexDirection="column"
            >
              <Center height={4} flex={1}>
                <Text textStyle="tableHead">{item}</Text>
              </Center>

              {/* Sub Heading */}
              <Center height={4} flex={1} justifyContent="start">
                {timeFrames[index].type === TimescaleType.month && (
                  <Text color={"#718096"}>
                    {format(timeFrames[index].startDate, "MMM do")}
                  </Text>
                )}
              </Center>
            </Center>
          );
        })}
        <Box w={28} />
      </Flex>

      <VStack spacing={4} align="stretch">
        {projectedData.map((item) => (
          <TableRow key={item.role.id} rowData={item} />
        ))}
      </VStack>
    </Flex>
  );
}

export default ReportTable;
