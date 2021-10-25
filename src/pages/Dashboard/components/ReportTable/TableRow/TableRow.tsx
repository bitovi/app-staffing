import React, { useState } from "react";
import { ProjectedData } from "../../../../../services/timeReport/interfaces";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/react";
import { SkillName } from "../../../../../services/api";
import Badge from "../../../../../components/Badge";

type TableRowProps = {
  rowData: ProjectedData;
};

function TableRow({ rowData }: TableRowProps): JSX.Element {
  const [isExpanded, setExpanded] = useState<boolean>(false);

  const badgeForRole = (role: SkillName): JSX.Element => {
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

  const getRowHighlight = (
    action: "Ok" | "Hire" | "Sell" | "Assign",
  ): string => {
    switch (action) {
      case "Assign":
        return "rgba(9, 240, 4, 0.27)";
      case "Hire":
        return "rgba(211, 42, 42, 0.12)";
      case "Sell":
        return "rgba(252, 208, 142, 0.32)";
      case "Ok":
      default:
        return "";
    }
  };

  const getTextColor = (action: "Ok" | "Hire" | "Sell" | "Assign"): string => {
    switch (action) {
      case "Assign":
        return "#1D5E1A";
      case "Hire":
        return "#D10C0C";
      case "Sell":
        return "#DB8C15";
      case "Ok":
      default:
        return "";
    }
  };

  const handleRowClick = () => {
    setExpanded(!isExpanded);
  };

  return (
    <Box boxShadow="base" bg="white" minHeight="" w="100%" borderRadius="lg">
      <Flex flex={1} flexDirection="row" onClick={handleRowClick}>
        {/* Department Column*/}
        <Center width="3xs" pr={3} py={2.5}>
          <Flex flex={1} ml={1}>
            {badgeForRole(rowData.role)}
          </Flex>

          <Flex flexDirection="column">
            <Box>
              <Text textStyle="bold">NEEDED</Text>
            </Box>
            <Box>
              <Text textStyle="bold">BENCH</Text>
            </Box>
            <Box>
              <Text textStyle="bold">ACTION</Text>
            </Box>
          </Flex>
        </Center>

        {rowData.projections.map((item, index) => {
          return (
            <Center
              key={index}
              flex={1}
              alignItems="end"
              flexDirection="column"
              background={getRowHighlight(item.action)}
            >
              <Flex alignItems="end" flexDirection="column" px={3}>
                <Box>
                  <Text textStyle="normal">{item.needed.length}</Text>
                </Box>
                <Box>
                  <Text textStyle="normal">{item.needed.length}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color={getTextColor(item.action)}>
                    {item.action}
                  </Text>
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
