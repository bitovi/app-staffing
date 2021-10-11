import React from "react";
import { Flex } from "@chakra-ui/layout";
import styles from "./ReportTable.module.scss";
import { Spacer, Square } from "@chakra-ui/react";
import { getTimescaleData, TimescaleData, TimescaleType } from "../../../../services/timeReport/timesReport";
import moment from "moment";


type IProps = {
  reportDate: Date
}


function ReportTable({
                       reportDate,
                     }: IProps): JSX.Element {


  const timescales: TimescaleData[] = getTimescaleData(reportDate);
  const columnHeading: string[] = timescales.map(item => {
    switch (item.type) {
      case TimescaleType.week:
        return moment(item.startDate).format("MMM Do");
      case TimescaleType.month:
        return moment(item.startDate).format("MMM YYYY");
      case TimescaleType.quarter:
        return `Q${moment(item.startDate).format("Q YYYY")}`
      default:
        return moment(item.startDate).format("MMM Do");
    }
  });


  return (

    <Flex flex={1}>

      <Square flex={2} className={styles.reportTableHeading} justifyContent={"start"}>
        Departments
      </Square>

      <Spacer />

      {/* Table Heading */}
      {
        columnHeading.map((item, index) => {
          return <Square flex={1} key={index} className={styles.reportTableHeading} justifyContent={"start"}>
            {item}
          </Square>;
        })
      }


    </Flex>


  );
}

export default ReportTable;
