import {
  Box,
  Flex,
  Heading,
  ListItem,
  Table,
  TableContainer,
  UnorderedList,
} from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { projects } from "../../../../mocks/fixtures";
import TableHeader from "../../../../pages/Dashboard/components/ReportTable/TableHeader";
import TableRow from "../../../../pages/Dashboard/components/ReportTable/TableRow";
import useProjection from "../../useProjection";
import useTimeline from "../../useTimeline";
import LineChart from "./LineChart";

interface ProjectionProps {
  title: string;
  dashboardStart: Date;
  roleStart: Date;
  roleStartConfidence: number;
  roleEnd?: Date;
  roleEndConfidence: number;
  assignmentStart: Date;
  assignmentEnd?: Date;
}

const ProjectionsContainer = ({
  title,
  dashboardStart,
  roleStart,
  roleStartConfidence = 1,
  roleEnd,
  roleEndConfidence = 1,
  assignmentStart,
  assignmentEnd,
}: ProjectionProps): JSX.Element => {
  // We always call the date constructors on date because storybook converts dates to unix timestamp
  const dashboardStartDate = new Date(dashboardStart);
  const { timeline } = useTimeline(dashboardStartDate);

  const skill = { id: "1001", name: "React" };

  const role = {
    id: "1",
    startDate: new Date(roleStart),
    startConfidence: roleStartConfidence,
    endDate: roleEnd && new Date(roleEnd),
    endConfidence: roleEndConfidence,
    project: projects[0],
    skills: [skill],
    assignments: [],
  };

  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
  };

  const assignment = {
    id: "2",
    role,
    startDate: new Date(assignmentStart),
    endDate: assignmentEnd && new Date(assignmentEnd),
  };

  const employeeWithAssignments = {
    ...employee,
    assignments: [{ ...assignment, employee }],
  };

  const roles = [
    {
      ...role,
      assignments: [
        {
          ...assignment,
          employee: employeeWithAssignments,
        },
      ],
    },
  ];
  const employees = [employeeWithAssignments];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
      employees,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStartDate,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;

  return (
    <>
      <Heading size="md" mb="40px">
        {title}
      </Heading>

      <UnorderedList mb="1em" color="blue">
        {roles.map((role) => (
          <ListItem key={role.id}>
            Role: {role.startConfidence * 100}% {role.startDate?.toDateString()}
            ,{" "}
            {role.endConfidence && role.endDate
              ? `${role.endConfidence * 100}% ${role.endDate?.toDateString()}`
              : "null"}
            <UnorderedList color="red">
              {role.assignments && role.assignments.length > 0 ? (
                role.assignments.map((assignment) => (
                  <ListItem key={assignment.id}>
                    Assignment: {assignment.startDate?.toDateString()},{" "}
                    {assignment.endDate
                      ? `${assignment.endDate.toDateString()}`
                      : "null"}
                  </ListItem>
                ))
              ) : (
                <ListItem>Assignment: None</ListItem>
              )}
            </UnorderedList>
          </ListItem>
        ))}
      </UnorderedList>

      <UnorderedList mb="5em">
        {Array.isArray(employees) &&
          employees.map((employee) => (
            <ListItem key={employee.id}>
              Employee: {employee.name} with skills:{" "}
              {employee.skills.map((skill, index) => (
                <span key={skill.id}>
                  {index ? ", " : ""}
                  {skill.name || ""}
                </span>
              ))}
              <UnorderedList>
                {Array.isArray(employee.assignments) &&
                  employee.assignments.map((assignment) => (
                    <ListItem key={assignment.id}>
                      Assignment {assignment.startDate?.toDateString()},{" "}
                      {assignment.endDate
                        ? assignment.endDate.toDateString()
                        : "null"}
                    </ListItem>
                  ))}
              </UnorderedList>
            </ListItem>
          ))}
      </UnorderedList>

      <Box>
        {roles.map((role) => (
          <Box key={role.id}>
            <LineChart data={role} timeline={timeline} isRole />
            {role.assignments &&
              role.assignments.map((assignment) => (
                <LineChart
                  key={assignment.id}
                  data={assignment}
                  timeline={timeline}
                />
              ))}
          </Box>
        ))}
      </Box>

      <Flex flexDirection="column">
        <TableContainer>
          <Table size="sm" sx={{ tableLayout: "fixed" }}>
            <TableHeader
              timeline={timeline}
              columnLabel={"DEPARTMENT"}
            ></TableHeader>
            <TableRow skill={skill} projections={projections} />
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default {
  title: "API/CustomProjections",
  component: ProjectionsContainer,
  argTypes: {
    dashboardStart: {
      control: { type: "date" },
    },
    roleStart: {
      control: { type: "date" },
    },
    roleStartConfidence: {
      control: { type: "number", min: 0, max: 1, step: 0.1 },
    },
    roleEnd: {
      control: { type: "date" },
    },
    roleEndConfidence: {
      control: { type: "number", min: 0, max: 1, step: 0.1 },
    },
    assignmentStart: {
      control: { type: "date" },
    },
    assignmentEnd: {
      control: { type: "date" },
    },
  },
} as ComponentMeta<typeof ProjectionsContainer>;

export const Standard: ComponentStory<typeof ProjectionsContainer> = (
  props,
) => <ProjectionsContainer {...props} />;

Standard.args = {
  title: "Custom args",
  dashboardStart: new Date(2018, 0, 1),
  roleStart: new Date(2018, 0, 1),
  assignmentStart: new Date(2018, 0, 1),
};
