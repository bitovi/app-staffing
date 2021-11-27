import type {
  ProjectedData,
  ProjectionAction,
} from "../../../../../services/projection";

import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Center, Divider } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { Skill } from "../../../../../services/api";
import Badge from "../../../../../components/Badge";

type TableRowProps = {
  rowData: ProjectedData;
};

function TableRow({ rowData }: TableRowProps): JSX.Element {
  const [isExpanded, setExpanded] = useState(false);

  const badgeForRole = (role: Skill): JSX.Element => {
    const ANGULAR_BADGE_COLOR = "#876363";
    const DESIGN_BADGE_COLOR = "#435BAE";
    const DEVOPS_BADGE_COLOR = "#5FAE43";
    const NODE_BADGE_COLOR = "#805AD5";
    const UX_BADGE_COLOR = "#AE436A";
    const REACT_BADGE_COLOR = "#61D0D7";

    let background = REACT_BADGE_COLOR;

    switch (role?.name) {
      case "Angular":
        background = ANGULAR_BADGE_COLOR;
        break;
      case "Design":
        background = DESIGN_BADGE_COLOR;
        break;
      case "DevOps":
        background = DEVOPS_BADGE_COLOR;
        break;
      case "Node":
        background = NODE_BADGE_COLOR;
        break;
      case "UX":
        background = UX_BADGE_COLOR;
        break;
      case "React":
      default:
        background = REACT_BADGE_COLOR;
    }

    return (
      <Badge size="sm" background={background}>
        {role?.name}
      </Badge>
    );
  };

  const getRowColors = (
    action: ProjectionAction,
  ): { highlight: string; background: string; text: string } => {
    switch (action) {
      case "Assign":
        return {
          highlight: "rgba(9, 240, 4, 0.27)",
          background: "rgba(9, 240, 4, 0.27)",
          text: "#38A169",
        };
      case "Hire":
        return { highlight: "#FFF5F7", background: "#FC8181", text: "#63171B" };
      case "Sell":
        return {
          highlight: "rgba(252, 208, 142, 0.32)",
          background: "rgba(252, 208, 142, 0.32)",
          text: "#DD6B20",
        };
      case "Ok":
      default:
        return {
          highlight: "",
          background: "",
          text: "",
        };
    }
  };

  const getLabelColor = (length: number): string =>
    length < 1 ? "#9DA8B7" : "";

  const handleRowClick = () => {
    setExpanded(!isExpanded);
  };

  return (
    <Box boxShadow="base" bg="white" minHeight="" w="100%" borderRadius="lg">
      <Flex flex={1} flexDirection="row" onClick={handleRowClick}>
        {/* Department Column*/}
        <Center width="3xs" px={3} minH={24}>
          <Flex flex={1} ml={1}>
            {badgeForRole(rowData.role)}
          </Flex>

          <Flex h="100%" flexDirection="column">
            <Flex flex={1} alignItems="center">
              <Text textStyle="bold">NEEDED</Text>
            </Flex>
            <Flex flex={1} alignItems="center">
              <Text textStyle="bold">BENCH</Text>
            </Flex>
            <Flex flex={1} alignItems="center">
              <Text textStyle="bold">ACTION</Text>
            </Flex>
          </Flex>
        </Center>

        {rowData.roleProjection.map(({ action, needed, bench }, index) => {
          const { highlight, background, text } = getRowColors(action);

          return (
            <Flex
              key={index}
              flex={1}
              alignItems="end"
              flexDirection="column"
              background={highlight}
            >
              <Flex w="100%" h="100%" flexDirection="column">
                <Flex flex={1} px={3} justifyContent="end">
                  <Text color={getLabelColor(needed.length)} textStyle="normal">
                    {needed.length}
                  </Text>
                </Flex>
                <Divider border={1} orientation="horizontal" />
                <Flex flex={1} px={3} justifyContent="end">
                  <Text color={getLabelColor(bench.length)} textStyle="normal">
                    {bench.length}
                  </Text>
                </Flex>
                <Divider border={1} orientation="horizontal" />
                <Center flex={1} px={3} background={background}>
                  <Text textStyle="bold" fontWeight={800} color={text}>
                    {action}
                  </Text>
                </Center>
              </Flex>
            </Flex>
          );
        })}

        <Center w={28} cursor="pointer" onClick={handleRowClick}>
          <Text userSelect="none" color="#3171D0">
            Details
          </Text>
          <ChevronDownIcon ml={2} color="#3171D0" />
        </Center>
      </Flex>
    </Box>
  );
}

export default TableRow;
