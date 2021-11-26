import type {
  TimelineData,
  ProjectedData,
} from "../../../../services/timeline";

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

interface IProps {
  reportDate?: Date;
}

const projectedData: ProjectedData[] = [
  {
    role: "React",
    projections: [
      {
        needed: [],
        bench: [],
        action: "Hire",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Assign",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Sell",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
    ],
  },
  {
    role: "Angular",
    projections: [
      {
        needed: [],
        bench: [],
        action: "Hire",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Assign",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Sell",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
    ],
  },
  {
    role: "DevOps",
    projections: [
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Assign",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Hire",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Sell",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
    ],
  },
  {
    role: "UX",
    projections: [
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Assign",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Hire",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Hire",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
    ],
  },
  {
    role: "Design",
    projections: [
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Assign",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Hire",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Sell",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
    ],
  },
  {
    role: "Node",
    projections: [
      {
        needed: [],
        bench: [],
        action: "Assign",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Hire",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Assign",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Hire",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Ok",
      },
      {
        needed: [],
        bench: [],
        action: "Sell",
      },
    ],
  },
];

export function ReportTable({ reportDate = new Date() }: IProps): JSX.Element {
  const timeFrames: TimelineData[] = useMemo(
    () => getTimeline(reportDate),
    [reportDate],
  );

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
          <TableRow key={item.role} rowData={item} />
        ))}
      </VStack>
    </Flex>
  );
}

export default ReportTable;
