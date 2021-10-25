import React, { useState } from "react";
import { ProjectedData } from "../../../../../services/timeReport/interfaces";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Center, Divider } from "@chakra-ui/react";
import { SkillName } from "../../../../../services/api";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Badge from "../../../../../components/Badge";

type TableRowProps = {
  rowData: ProjectedData;
};

function TableRow({ rowData }: TableRowProps): JSX.Element {
  const [isExpanded, setExpanded] = useState<boolean>(false);

  const badgeForRole = (role: SkillName): JSX.Element => {
    const ANGULAR_BADGE_COLOR = "#876363";
    const DESIGN_BADGE_COLOR = "#435BAE";
    const DEVOPS_BADGE_COLOR = "#5FAE43";
    const NODE_BADGE_COLOR = "#805AD5";
    const UX_BADGE_COLOR = "#AE436A";
    const REACT_BADGE_COLOR = "#876363";

    switch (role) {
      case "Angular":
        return (
          <Badge size="sm" background={ANGULAR_BADGE_COLOR}>
            {role}
          </Badge>
        );
      case "Design":
        return (
          <Badge size="sm" background={DESIGN_BADGE_COLOR}>
            {role}
          </Badge>
        );
      case "DevOps":
        return (
          <Badge size="sm" background={DEVOPS_BADGE_COLOR}>
            {role}
          </Badge>
        );
      case "Node":
        return (
          <Badge size="sm" background={NODE_BADGE_COLOR}>
            {role}
          </Badge>
        );
      case "UX":
        return (
          <Badge size="sm" background={UX_BADGE_COLOR}>
            {role}
          </Badge>
        );
      case "React":
      default:
        return <Badge size="sm">{REACT_BADGE_COLOR}</Badge>;
    }
  };

  const getRowHighlight = (
    action: "Ok" | "Hire" | "Sell" | "Assign",
  ): string => {
    switch (action) {
      case "Assign":
        return "rgba(9, 240, 4, 0.27)";
      case "Hire":
        return "#FFF5F7";
      case "Sell":
        return "rgba(252, 208, 142, 0.32)";
      case "Ok":
      default:
        return "";
    }
  };

  const getRowBackground = (
    action: "Ok" | "Hire" | "Sell" | "Assign",
  ): string => {
    switch (action) {
      case "Assign":
        return "rgba(9, 240, 4, 0.27)";
      case "Hire":
        return "#FC8181";
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
        return "#38A169";
      case "Hire":
        return "#63171B";
      case "Sell":
        return "#DD6B20";
      case "Ok":
      default:
        return "";
    }
  };

  const isLabelBold = (length: number): string => (length < 1 ? "#9DA8B7" : "");

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
            <Flex
              key={index}
              flex={1}
              alignItems="end"
              flexDirection="column"
              background={getRowHighlight(item.action)}
            >
              <Flex w="100%" h="100%" flexDirection="column">
                <Flex flex={1} px={3} justifyContent="end">
                  <Text
                    color={isLabelBold(item.needed.length)}
                    textStyle="normal"
                  >
                    {item.needed.length}
                  </Text>
                </Flex>
                <Divider border={1} orientation="horizontal" />
                <Flex flex={1} px={3} justifyContent="end">
                  <Text
                    color={isLabelBold(item.bench.length)}
                    textStyle="normal"
                  >
                    {item.bench.length}
                  </Text>
                </Flex>
                <Divider border={1} orientation="horizontal" />
                <Center
                  flex={1}
                  px={3}
                  background={getRowBackground(item.action)}
                >
                  <Text
                    textStyle="bold"
                    fontWeight={800}
                    color={getTextColor(item.action)}
                  >
                    {item.action}
                  </Text>
                </Center>
              </Flex>
            </Flex>
          );
        })}

        <Center w={28} cursor="pointer" onClick={handleRowClick}>
          <Text userSelect="none" color="#3171D0">
            {" "}
            Details{" "}
          </Text>
          <ChevronDownIcon ml={2} color="#3171D0" />
        </Center>
      </Flex>
    </Box>
  );
}

export default TableRow;
