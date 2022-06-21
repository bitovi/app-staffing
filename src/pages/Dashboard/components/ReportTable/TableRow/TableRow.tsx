import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Center, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import Badge from "../../../../../components/Badge";

import type { Skill } from "../../../../../services/api";
import type { Projection } from "../../../../../services/projection";
import { Action } from "../../../../../services/projection/projections";

export interface TableRowProps {
  skill: Skill;
  projections: Projection[];
}

export const skillBackgrounds: { [key: string]: string } = {
  Design: "#435BAE",
  UX: "#AE436A",
  Angular: "#876363",
  React: "#61D0D7",
  Node: "#805AD5",
  DevOps: "#5FAE43",
  "UI Designer": "#435BAE",
  "UX Designer": "#AE436A",
  "Project Management": "#B55F10",
};
function TableRow({ skill, projections }: TableRowProps): JSX.Element {
  const [isExpanded, setExpanded] = useState(false);

  const getRowColors = (
    action: Action,
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
      case "OK":
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

  let maxNeededRoles = 0;
  projections.forEach(({ needed }) => {
    maxNeededRoles = Math.max(maxNeededRoles, needed.roles?.length || 0);
  });

  let maxBenchEmployees = 0;
  projections.forEach(({ bench }) => {
    // We only want to show employees with a confidence greater than 0%
    const employees = bench.employees?.filter((employee) => employee.value > 0);
    maxBenchEmployees = Math.max(maxBenchEmployees, employees?.length || 0);
  });

  return (
    <Tbody bg="white" w="100%" borderRadius="lg">
      <Tr>
        <Th
          rowSpan={isExpanded ? 3 + maxNeededRoles + maxBenchEmployees : 3}
          textTransform="none"
          borderRadius="8px"
        >
          <Center px={3}>
            <Flex flex={1} ml={1}>
              <Badge
                isTruncated={false}
                size="sm"
                whiteSpace="break-spaces"
                background={`skills.${skill.name}`}
                maxWidth="100px"
                textAlign="center"
                display="flex"
              >
                {skill.name}
              </Badge>
            </Flex>
          </Center>
        </Th>

        <Th borderBottom="none">Needed</Th>

        {projections.map(({ action, needed }, index) => {
          const { highlight, text } = getRowColors(action);
          return (
            <Td key={index} background={highlight} color={text}>
              <Flex flex={1} px={3} justifyContent="end">
                <Text color={getLabelColor(needed.total)} textStyle="normal">
                  {needed.total}
                </Text>
              </Flex>
            </Td>
          );
        })}

        <Td
          rowSpan={isExpanded ? 3 + maxNeededRoles + maxBenchEmployees : 3}
          borderRadius="8px"
        >
          <Center cursor="pointer" onClick={handleRowClick}>
            <Text userSelect="none" color="#3171D0">
              Details
            </Text>
            <ChevronDownIcon ml={2} color="#3171D0" />
          </Center>
        </Td>
      </Tr>

      {isExpanded && maxNeededRoles
        ? Array.from({ length: maxNeededRoles }).map((_item, index) => (
            <Tr key={index}>
              <Th color="transparent" borderBottom="none">
                Needed
              </Th>

              {projections.map(({ action, needed }, i) => {
                const { highlight, text } = getRowColors(action);
                if (needed.roles && needed.roles[index]) {
                  const neededRole = needed.roles[index];
                  const neededProject = neededRole.project;

                  return (
                    <Td
                      whiteSpace="pre-wrap"
                      borderBottom="none"
                      key={i}
                      background={highlight}
                      color={text}
                      p="5px"
                      paddingRight="5px"
                      textAlign="right"
                    >
                      <Box fontSize="10px" fontWeight="600" color="#3171D0">
                        {neededProject ? (
                          <Link to={`projects/${neededProject.id}`}>
                            <Text key={neededProject.name}>{`${
                              neededProject.name
                            } ${(neededRole.value * 100).toFixed(0)}%`}</Text>
                          </Link>
                        ) : null}
                      </Box>
                    </Td>
                  );
                } else {
                  return <Td key={i}></Td>;
                }
              })}
            </Tr>
          ))
        : null}

      <Tr>
        <Th borderBottom="none">Bench</Th>

        {projections.map(({ action, bench }, index) => {
          const { highlight, text } = getRowColors(action);
          return (
            <Td
              borderTop="1px solid var(--chakra-colors-gray-100)"
              key={index}
              background={highlight}
              color={text}
            >
              <Flex flex={1} px={3} justifyContent="end">
                <Text color={getLabelColor(bench.total)} textStyle="normal">
                  {bench.total}
                </Text>
              </Flex>
            </Td>
          );
        })}
      </Tr>

      {isExpanded && maxBenchEmployees
        ? Array.from({ length: maxBenchEmployees }).map((_item, index) => (
            <Tr key={index}>
              <Th color="transparent" borderBottom="none">
                Bench
              </Th>

              {projections.map(({ action, bench }, i) => {
                const { highlight, text } = getRowColors(action);

                const employees = bench.employees?.filter(
                  (employee) => employee.value > 0,
                );

                return (
                  <Td
                    whiteSpace="pre-wrap"
                    borderBottom="none"
                    key={i}
                    background={highlight}
                    color={text}
                    p="1px"
                    paddingRight="5px"
                    textAlign="right"
                  >
                    <Box fontSize="10px" fontWeight="600" color="#333333">
                      {employees &&
                      employees[index] &&
                      employees[index].value ? (
                        <Text key={employees[index].name}>{`${
                          employees[index].name.split(" ")[0]
                        } ${employees[index].value * 100}%`}</Text>
                      ) : null}
                    </Box>
                  </Td>
                );
              })}
            </Tr>
          ))
        : null}

      <Tr boxShadow="base">
        <Th borderBottom="none">Action</Th>

        {projections.map(({ action }, index) => {
          const { background, text } = getRowColors(action);
          return (
            <Td
              borderTop="1px solid var(--chakra-colors-gray-100)"
              key={index}
              background={background}
              color={text}
            >
              <Center flex={1} px={3}>
                <Text textStyle="bold" fontWeight={800} color={text}>
                  {action}
                </Text>
              </Center>
            </Td>
          );
        })}
      </Tr>

      <Tr h="5" />
    </Tbody>
  );
}

export default TableRow;
