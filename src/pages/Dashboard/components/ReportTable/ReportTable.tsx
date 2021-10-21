import { useMemo } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { Center, Spacer, Text } from "@chakra-ui/react";
import {
  getMonthForWeek,
  getTimescaleData,
  TimescaleData,
  TimescaleType,
} from "../../../../services/timeReport/timesReport";
import { format, setMonth } from "date-fns";

interface IProps {
  reportDate: Date;
}

export function ReportTable({ reportDate }: IProps): JSX.Element {
  const timeFrames: TimescaleData[] = useMemo(
    () => getTimescaleData(reportDate),
    [reportDate],
  );

  const columnHeading: string[] = timeFrames.map((item) => {
    switch (item.type) {
      case TimescaleType.week:
        return format(item.startDate, "MMM do");
      case TimescaleType.month:
        const monthNum = getMonthForWeek(item.startDate);
        const monthDate = setMonth(new Date(), monthNum);
        return format(monthDate, "MMMM");
      case TimescaleType.quarter:
        return `Q${format(item.startDate, "Q yyyy")}`;
      default:
        return format(item.startDate, "MMM do");
    }
  });

  return (
    <Flex flex={1} height={8} justifyContent={"start"}>
      <Box flex={2} alignItems={"start"}>
        <Text textStyle="tableHead">Departments</Text>
      </Box>

      <Spacer />

      {/* Table Heading */}
      {columnHeading.map((item, index) => {
        return (
          <Center
            flex={1}
            key={index}
            alignItems={"start"}
            flexDirection="column"
          >
            <Center height={4} flex={1}>
              <Text textStyle="tableHead">{item}</Text>
            </Center>

            {/* Sub Heading */}
            <Center height={4} flex={1}>
              {timeFrames[index].type === TimescaleType.month && (
                <Text textStyle="subHead">
                  {format(timeFrames[index].startDate, "MMM do")}
                </Text>
              )}
            </Center>
          </Center>
        );
      })}





    </Flex>
  );
}

export default ReportTable;
