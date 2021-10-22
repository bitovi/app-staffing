import { useMemo } from "react";
import { Flex } from "@chakra-ui/layout";
import { Center, Text, VStack } from "@chakra-ui/react";
import {
  getMonthForWeek,
  getTimescaleData,
  TimescaleData,
  TimescaleType,
} from "../../../../services/timeReport/timesReport";
import { format, setMonth } from "date-fns";
import TableRow from "./TableRow";
import { ProjectedData } from "../../../../services/timeReport/interfaces";

interface IProps {
  reportDate: Date;
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

export function ReportTable({ reportDate }: IProps): JSX.Element {
  const timeFrames: TimescaleData[] = useMemo(
    () => getTimescaleData(reportDate),
    [reportDate],
  );

  const columnHeading: string[] = timeFrames.map((item) => {
    switch (item.type) {
      case TimescaleType.week:
        return `${format(item.startDate, "MMM").toUpperCase()} ${format(
          item.startDate,
          "do",
        )}`;
      case TimescaleType.month:
        const monthNum = getMonthForWeek(item.startDate);
        const monthDate = setMonth(new Date(), monthNum);
        return format(monthDate, "MMMM").toUpperCase();
      case TimescaleType.quarter:
        return `Q${format(item.startDate, "Q yyyy")}`;
      default:
        return format(item.startDate, "MMM do");
    }
  });

  const handleRowClick = () => {
    console.log("row click");
  };

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
      </Flex>

      <VStack spacing={4} align="stretch">
        {projectedData.map((item) => (
          <TableRow key={item.role} rowData={item} onClick={handleRowClick} />
        ))}
      </VStack>
    </Flex>
  );
}

export default ReportTable;
