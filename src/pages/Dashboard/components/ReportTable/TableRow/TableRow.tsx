import React from "react";
import { ProjectedData } from "../../../../../services/timeReport/interfaces";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/react";

type TableRowProps = {
  rowData: ProjectedData;
  onClick(): void;
};

function TableRow({ rowData, onClick }: TableRowProps) {
  return (
    <Box
      boxShadow="base"
      bg="white"
      py={2.5}
      minHeight=""
      w="100%"
      borderRadius="lg"
    >
      <Flex flex={1} flexDirection="row" onClick={onClick}>
        {/* Department Column*/}
        <Center width="3xs" pr={3}>
          <Flex flex={1}>{rowData.role}</Flex>

          <Flex flexDirection="column">
            <Box>NEEDED</Box>
            <Box>BENCH</Box>
            <Box>ACTION</Box>
          </Flex>
        </Center>

        {rowData.projections.map((item, index) => {
          return (
            <Center
              key={index}
              flex={1}
              alignItems="start"
              flexDirection="column"
            >
              <Flex flexDirection="column">
                <Box>
                  <Text>{item.needed.length}</Text>
                </Box>
                <Box>
                  <Text>{item.needed.length}</Text>
                </Box>
                <Box>
                  <Text>{item.action}</Text>
                </Box>
              </Flex>
            </Center>
          );
        })}
      </Flex>
    </Box>
  );
}

export default TableRow;
