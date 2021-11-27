import { Box, Flex } from "@chakra-ui/layout";
import { Center, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";

import { TimescaleType } from "../../../../services/timeline";

import TableRow from "./TableRow";
import { useProjection } from "../../../../services/projection/useProjection";

interface IProps {
  reportDate?: Date;
}

export function ReportTable({ reportDate = new Date() }: IProps): JSX.Element {
  const { projections, timeline } = useProjection(reportDate);

  return (
    <Flex flexDirection="column">
      <Flex flex={1} height={8} mb={7} alignItems={"start"}>
        <Center width="3xs" justifyContent={"start"}>
          <Text textStyle="tableHead">DEPARTMENT</Text>
        </Center>

        {/* Table Heading */}
        {timeline.map(({ title, type, startDate }, index) => {
          return (
            <Center
              flex={1}
              key={index}
              alignItems={"end"}
              flexDirection="column"
            >
              <Center height={4} flex={1}>
                <Text textStyle="tableHead">{title}</Text>
              </Center>

              {/* Sub Heading */}
              <Center height={4} flex={1} justifyContent="start">
                {type === TimescaleType.month && (
                  <Text color={"#718096"}>{format(startDate, "MMM do")}</Text>
                )}
              </Center>
            </Center>
          );
        })}
        <Box w={28} />
      </Flex>

      <VStack spacing={4} align="stretch">
        {projections.map((item) => (
          <TableRow key={item.role.id} rowData={item} />
        ))}
      </VStack>
    </Flex>
  );
}

export default ReportTable;
