import React from "react";
import { ProjectedData } from "../../../../../services/timeReport/interfaces";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/react";
import { SkillName } from "../../../../../services/api";
import Badge from "../../../../../components/Badge";

type TableRowProps = {
  rowData: ProjectedData;
  onClick(): void;
};

function TableRow({ rowData, onClick }: TableRowProps): JSX.Element {
  const badgeForRole = (role: SkillName) => {
    switch (role) {
      case "Angular":
        return (
          <Badge size="sm" background="#876363">
            {role}
          </Badge>
        );
      case "Design":
        return (
          <Badge size="sm" background="#435BAE">
            {role}
          </Badge>
        );
      case "DevOps":
        return (
          <Badge size="sm" background="#5FAE43">
            {role}
          </Badge>
        );
      case "Node":
        return (
          <Badge size="sm" background="#805AD5">
            {role}
          </Badge>
        );
      case "UX":
        return (
          <Badge size="sm" background="#AE436A">
            {role}
          </Badge>
        );
      case "React":
      default:
        return <Badge size="sm">{role}</Badge>;
    }
  };

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
          <Flex flex={1} ml={1}>
            {badgeForRole(rowData.role)}
          </Flex>

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
