import React from "react";
import { Flex } from "@chakra-ui/layout";
import { Spacer, Square, Text } from "@chakra-ui/react";
import { getTimescaleData, TimescaleData, TimescaleType } from "../../../../services/timeReport/timesReport";
import { format } from "date-fns";


interface IProps {
  reportDate: Date;
}


export function ReportTable({ reportDate }: IProps): JSX.Element {


  const timescales: TimescaleData[] = getTimescaleData(reportDate);
  const columnHeading: string[] = timescales.map(item => {
    switch (item.type) {
      case TimescaleType.week:
        return format(item.startDate, "MMM do");
      case TimescaleType.month:
        return format(item.startDate, "MMM yyyy");
      case TimescaleType.quarter:
        return `Q${format(item.startDate, "Q yyyy")}`;
      default:
        return format(item.startDate, "MMM do");
    }
  });


  return (
    <Flex flex={1}>

      <Square flex={2} justifyContent={"start"}>
        <Text textStyle="tableHead">
          Departments
        </Text>
      </Square>

      <Spacer />

      {/* Table Heading */}
      {
        columnHeading.map((item, index) => {
          return <Square flex={1} key={index} justifyContent={"start"}>
            <Text textStyle="tableHead">
              {item}
            </Text>
          </Square>;
        })
      }


    </Flex>
  );
}

export default ReportTable;
