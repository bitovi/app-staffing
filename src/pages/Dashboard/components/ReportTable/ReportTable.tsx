import { Flex } from "@chakra-ui/layout";
import { Box, Link, Table, TableContainer, Text } from "@chakra-ui/react";

import { Projection, SkillRole, useProjection, useTimeline } from "../../../../services/projection";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { Role, Skill, useRoles, useSkills } from "../../../../services/api";
import cloneDeep from "lodash/cloneDeep";
import { useState } from "react";
import { Action } from "../../../../services/projection/projections";
import DataTimelineHeader from "../../../../components/DataTable";

interface ReportTableProps {
  date?: Date;
}

export function ReportTable({
  date = new Date(),
}: ReportTableProps): JSX.Element {
  const availableSkills = useSkills({
    include: [
      "employees.skills",
      "employees.assignments.role.skills",
      "employees.assignments.role.project",
    ],
  });

  const { timeline } = useTimeline(date);

  const dashboardStart = timeline[0]?.startDate;
  const dashboardEnd = timeline[timeline.length - 1]?.endDate;

  const roles = useRoles({
    include: ["assignments", "project", "skills"],
    filter: {
      ...(dashboardEnd && { startDate: { $lt: dashboardEnd } }),
      ...(dashboardStart && { endDate: { $gt: dashboardStart } }),
      endDate: { $eq: undefined },
    },
  });

  const skillsWithRoles: SkillRole[] = addRolesToSkills(availableSkills, roles);

  const { skillsWithProjection } = useProjection(date, skillsWithRoles);

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <DataTimelineHeader heading="Department" timeline={timeline} />

        {/*  Header */}
        {skillsWithProjection.map(({ skill, projections }) => (
          <Flex
            key={skill.id}
            flexDirection="column"
            style={{
              marginBottom: "24px",
              boxShadow:
                "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
              borderRadius: "4px",
            }}
          >
            <Flex
              py={6}
              pl={11}
              fontWeight="700"
              letterSpacing="0.05em"
              flexDirection="row"
              style={{
                background: "#EDF2F7",
              }}
            >
              <Flex width={200}>{skill.name}</Flex>

              {projections.map((projection, index, array) => {
                if (index == array.length - 1)
                  return (
                    <Flex flex={1}>
                      <Link>View Details</Link>
                    </Flex>
                  );

                return <Flex key={index} flex={1} />;
              })}
            </Flex>

            <FlexTable key={skill.id} skill={skill} projections={projections} />
          </Flex>
        ))}
      </Flex>

      <TableContainer overflowY="initial" overflowX="initial">
        <Table size="sm" sx={{ tableLayout: "fixed", background: "gray.10" }}>
          <TableHeader timeline={timeline} columnLabel={"DEPARTMENT"} />

          {skillsWithProjection.map(({ skill, projections }) => (
            <TableRow key={skill.id} skill={skill} projections={projections} />
          ))}
        </Table>
      </TableContainer>
    </Flex>
  );
}

export interface TableRowProps {
  skill: Skill;
  projections: Projection[];
}

function FlexTable({ skill, projections }: TableRowProps) {
  const [isExpanded] = useState(false);

  // const skillBackgrounds: { [key: string]: string } = {
  //   Design: "#435BAE",
  //   UX: "#AE436A",
  //   Angular: "#876363",
  //   React: "#61D0D7",
  //   Node: "#805AD5",
  //   DevOps: "#5FAE43",
  //   "UI Designer": "#435BAE",
  //   "UX Designer": "#AE436A",
  //   "Project Management": "#B55F10",
  // };

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

  // const handleRowClick = () => {
  //   setExpanded(!isExpanded);
  // };

  let maxNeededRoles = 0;
  projections.forEach(({ needed }) => {
    maxNeededRoles = Math.max(maxNeededRoles, needed.roles?.length || 0);
  });

  let maxBenchEmployees = 0;
  projections.forEach(({ bench }) => {
    // We only want to show employees with a confidence greater or equal to 50%
    const employees = bench.employees?.filter(
      (employee) => employee.value >= 0.5,
    );
    maxBenchEmployees = Math.max(maxBenchEmployees, employees?.length || 0);
  });

  return (
    <Flex pl={11} flexDirection="column" bg="white" w="100%" borderRadius="lg">
      <Flex>
        <Flex width={200} borderBottom="none">
          Needed
        </Flex>
        {projections.map(({ action, needed }, index) => {
          const { highlight, text } = getRowColors(action);
          return (
            <Flex flex={1} key={index} background={highlight} color={text}>
              {/*<Flex flex={1} px={3} justifyContent="end">*/}
              <Text color={getLabelColor(needed.total)} textStyle="normal">
                {needed.total}
              </Text>
              {/*</Flex>*/}
            </Flex>
          );
        })}
        {/*<Flex*/}
        {/*  rowSpan={isExpanded ? 3 + maxNeededRoles + maxBenchEmployees : 3}*/}
        ƒ{/*  borderRadius="8px"*/}
        {/*>*/}
        {/*  <Flex cursor="pointer" onClick={handleRowClick}>*/}
        {/*    <Text userSelect="none" color="#3171D0">*/}
        {/*      Details*/}
        {/*    </Text>*/}
        {/*    <ChevronDownIcon ml={2} color="#3171D0" />*/}
        {/*  </Flex>*/}
        {/*</Flex>Flex*/}
      </Flex>

      {isExpanded && maxNeededRoles
        ? Array.from({ length: maxNeededRoles }).map((_item, index) => (
            <Flex key={index}>
              <Flex width={200} color="transparent" borderBottom="none">
                Needed
              </Flex>

              {projections.map(({ action, needed }, i) => {
                const { highlight, text } = getRowColors(action);
                if (needed.roles && needed.roles[index]) {
                  const neededRole = needed.roles[index];
                  const neededProject = neededRole.project;

                  return (
                    <Flex
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
                    </Flex>
                  );
                } else {
                  return <Flex key={i} />;
                }
              })}
            </Flex>
          ))
        : null}

      <Flex>
        <Flex width={200} borderBottom="none">
          Bench
        </Flex>

        {projections.map(({ action, bench }, index) => {
          const { highlight, text } = getRowColors(action);
          return (
            <Flex
              flex={1}
              borderTop="1px solid var(--chakra-colors-gray-100)"
              key={index}
              background={highlight}
              color={text}
            >
              {/*<Flex flex={1} px={3} justifyContent="end">*/}
              <Text color={getLabelColor(bench.total)} textStyle="normal">
                {bench.total}
              </Text>
              {/*</Flex>*/}
            </Flex>
          );
        })}
      </Flex>

      {isExpanded && maxBenchEmployees
        ? Array.from({ length: maxBenchEmployees }).map((_item, index) => (
            <Flex key={index}>
              <Flex width={200} color="transparent" borderBottom="none">
                Bench
              </Flex>

              {projections.map(({ action, bench }, i) => {
                const { highlight, text } = getRowColors(action);

                const employees = bench.employees?.filter(
                  (employee) => employee.value >= 0.5,
                );

                return (
                  <Flex
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
                  </Flex>
                );
              })}
            </Flex>
          ))
        : null}

      <Flex>
        <Flex width={200} borderBottom="none">
          Action
        </Flex>

        {projections.map(({ action }, index) => {
          const { background, text } = getRowColors(action);
          return (
            <Flex
              flex={1}
              borderTop="1px solid var(--chakra-colors-gray-100)"
              key={index}
              background={background}
              color={text}
            >
              <Text textStyle="bold" fontWeight={800} color={text}>
                {action}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default ReportTable;

function addRolesToSkills(skills: Skill[], roles: Role[]) {
  const skillRoles: SkillRole[] = cloneDeep(skills);
  for (const skill of skillRoles) {
    for (const role of roles) {
      if (role.skills?.length > 0 && role.skills[0].id === skill.id) {
        if (!skill.roles) {
          skill.roles = [];
        }
        skill.roles.push(role);
      }
    }
  }
  return skillRoles;
}
