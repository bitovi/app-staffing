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
import { BrowserRouter } from "react-router-dom";
import { projects } from "../../../../mocks/fixtures";
import TableHeader from "../../../../pages/Dashboard/components/ReportTable/TableHeader";
import TableRow from "../../../../pages/Dashboard/components/ReportTable/TableRow";
import { Employee, Role, Skill } from "../../../api";
import useProjection from "../../useProjection";
import useTimeline from "../../useTimeline";
import { Projection } from "../projections";
import { formatDateToUTC } from "../../../helpers/utcdate";
import LineChart from "./LineChart";

interface ProjectionProps {
  title: string;
  dashboardStart: Date;
  roles: Role[];
  skill: Skill;
  projections: Projection[];
  employees?: Employee[];
}

const ProjectionsContainer = ({
  title,
  dashboardStart,
  roles,
  skill,
  projections,
  employees,
}: ProjectionProps): JSX.Element => {
  const { timeline } = useTimeline(dashboardStart);

  return (
    <BrowserRouter>
      <Heading size="md" mb="40px">
        {title}
      </Heading>

      <UnorderedList mb="1em" color="blue">
        {roles.map((role) => (
          <ListItem key={role.id}>
            Role: {role.startConfidence * 100}%{" "}
            {formatDateToUTC(role.startDate).toDateString()},{" "}
            {role.endConfidence && role.endDate
              ? `${role.endConfidence * 100}% ${formatDateToUTC(role.endDate)}`
              : "null"}
            <UnorderedList color="red">
              {role.assignments && role.assignments.length > 0 ? (
                role.assignments.map((assignment) => (
                  <ListItem key={assignment.id}>
                    Assignment:{" "}
                    {assignment.startDate instanceof Date
                      ? assignment.startDate.toDateString()
                      : assignment.startDate}
                    ,{" "}
                    {assignment.endDate
                      ? `${
                          assignment.endDate instanceof Date
                            ? assignment.endDate.toDateString()
                            : assignment.endDate
                        }`
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
                      Assignment{" "}
                      {assignment.startDate instanceof Date
                        ? assignment.startDate?.toDateString()
                        : assignment.startDate}
                      ,{" "}
                      {assignment.endDate instanceof Date
                        ? assignment.endDate.toDateString()
                        : assignment.endDate
                        ? assignment.endDate
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
        <TableContainer overflowY="initial" overflowX="initial">
          <Table size="sm" sx={{ tableLayout: "fixed", background: "#ffffff" }}>
            <TableHeader
              timeline={timeline}
              columnLabel={"DEPARTMENT"}
            ></TableHeader>
            <TableRow skill={skill} projections={projections} />
          </Table>
        </TableContainer>
      </Flex>
    </BrowserRouter>
  );
};

export default {
  title: "API/Projections",
  component: ProjectionsContainer,
} as ComponentMeta<typeof ProjectionsContainer>;

export const NeededUseCase0: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const roles = [
    {
      id: "1",
      startDate: new Date(2018, 0, 1),
      startConfidence: 1,
      endDate: new Date(2018, 0, 7),
      endConfidence: 1,
      project: projects[0],
      skills: [skill],
      assignments: [],
    },
  ];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Role fitting neatly in a week, no assignment"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
    />
  );
};

NeededUseCase0.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const NeededUseCase1: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 1,
    endDate: new Date(2018, 0, 7),
    endConfidence: 1,
    project: projects[0],
    skills: [skill],
    assignments: [],
  };

  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
  };

  const roles = [
    {
      ...role,
      assignments: [
        {
          id: "2",
          employee,
          role,
          startDate: new Date(2018, 0, 1),
          endDate: new Date(2018, 0, 7),
        },
      ],
    },
  ];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Role and assignment fitting neatly in a week, no assignment"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
    />
  );
};

NeededUseCase1.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const NeededUseCase2: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 1,
    endDate: new Date(2018, 0, 7),
    endConfidence: 1,
    project: projects[0],
    skills: [skill],
  };
  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
  };
  const roles = [
    {
      ...role,
      assignments: [
        {
          id: "2",
          employee,
          role,
          startDate: new Date(2018, 0, 2),
        },
      ],
    },
  ];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Role fitting neatly in a week, assignment starting one day after"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
    />
  );
};

NeededUseCase2.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const NeededUseCase3: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 1,
    endDate: new Date(2018, 2, 1),
    endConfidence: 1,
    project: projects[0],
    skills: [skill],
  };
  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
  };
  const roles = [
    {
      ...role,
      assignments: [
        {
          id: "2",
          employee,
          role,
          startDate: new Date(2018, 0, 1),
          endDate: new Date(2018, 0, 16),
        },
      ],
    },
  ];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Role for 2 months, assignment at day one and ending 2 weeks later"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
    />
  );
};

NeededUseCase3.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const NeededUseCase4: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 0.8,
    endDate: new Date(2018, 0, 14),
    endConfidence: 0.2,
    project: projects[0],
    skills: [skill],
  };

  const roles = [
    {
      ...role,
      assignments: [],
    },
  ];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Role starts with 80% and end with 20%"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
    />
  );
};

NeededUseCase4.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const NeededUseCase5: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 0.8,
    endDate: new Date(2018, 0, 21),
    endConfidence: 0.2,
    project: projects[0],
    skills: [skill],
  };

  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
  };

  const roles = [
    {
      ...role,
      assignments: [
        {
          id: "2",
          employee,
          role,
          startDate: new Date(2018, 0, 15),
          endDate: new Date(2018, 0, 16),
        },
      ],
    },
  ];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Role starts with 80% and end with 20%, assigned one day"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
    />
  );
};

NeededUseCase5.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const NeededUseCase6: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 0.8,
    endDate: new Date(2018, 0, 14),
    endConfidence: 0.2,
    project: projects[0],
    skills: [skill],
  };

  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
  };

  const roles = [
    {
      ...role,
      assignments: [
        {
          id: "2",
          employee,
          role,
          startDate: new Date(2018, 0, 8),
          endDate: new Date(2018, 0, 14),
        },
      ],
    },
  ];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Role starts with 80% and end with 20%, assigned for a week"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
    />
  );
};

NeededUseCase6.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const NeededUseCase7: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 4),
    startConfidence: 0.8,
    endDate: new Date(2018, 0, 10),
    endConfidence: 0.2,
    project: projects[0],
    skills: [skill],
  };

  const roles = [
    {
      ...role,
      assignments: [],
    },
  ];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Role starts and ends in the middle of the week"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
    />
  );
};

NeededUseCase7.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const NeededUseCase8: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 1,
    endDate: new Date(2018, 0, 10),
    endConfidence: 0.8,
    project: projects[0],
    skills: [skill],
  };

  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
  };
  const roles = [
    {
      ...role,
      assignments: [
        {
          id: "2",
          employee,
          role,
          startDate: new Date(2018, 0, 1),
          endDate: new Date(2018, 0, 10),
        },
      ],
    },
  ];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Role ends in the middle of a week"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
    />
  );
};

NeededUseCase8.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const NeededUseCase9: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 1,
    endDate: new Date(2018, 0, 7),
    endConfidence: 0.7,
    project: projects[0],
    skills: [skill],
  };
  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
  };
  const roles = [
    {
      ...role,
      assignments: [
        {
          id: "2",
          employee,
          role,
          startDate: new Date(2018, 0, 1),
        },
      ],
    },
  ];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Role starts and ends, assignment with no end date"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
    />
  );
};

NeededUseCase9.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const BenchUseCase1: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 1,
    endDate: new Date(2018, 0, 14),
    endConfidence: 0.7,
    project: projects[0],
    skills: [skill],
  };

  const assignment = {
    id: "2",
    role,
    startDate: new Date(2018, 0, 1),
    endDate: new Date(2018, 0, 7),
  };

  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
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
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Employee Assigned for a week and then unassigned"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
      employees={employees}
    />
  );
};

BenchUseCase1.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const BenchUseCase2: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 1,
    endDate: new Date(2018, 0, 14),
    endConfidence: 1,
    project: projects[0],
    skills: [skill],
  };

  const assignment = {
    id: "2",
    role,
    startDate: new Date(2018, 0, 1),
    endDate: new Date(2018, 0, 14),
  };

  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill, { id: "1002", name: "Node" }],
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
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Employee with 2 skills Assigned for 2 week and then unassigned"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
      employees={employees}
    />
  );
};

BenchUseCase2.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const BenchUseCase3: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 1,
    endDate: new Date(2018, 0, 14),
    endConfidence: 0.7,
    project: projects[0],
    skills: [skill],
  };

  const assignment = {
    id: "2",
    role,
    startDate: new Date(2018, 0, 1),
  };

  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
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
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Assignment with no end date, role end not 100%"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
      employees={employees}
    />
  );
};

BenchUseCase3.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const BenchUseCase4: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role1 = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 1,
    endDate: new Date(2018, 0, 7),
    endConfidence: 0.8,
    project: projects[0],
    skills: [skill],
  };

  const role2 = {
    id: "2",
    startDate: new Date(2018, 0, 8),
    startConfidence: 1,
    endDate: new Date(2018, 0, 14),
    endConfidence: 0.6,
    project: projects[0],
    skills: [skill],
  };

  const assignment1 = {
    id: "101",
    role: role1,
    startDate: new Date(2018, 0, 1),
  };

  const assignment2 = {
    id: "102",
    role: role2,
    startDate: new Date(2018, 0, 8),
  };

  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
  };

  const employeeWithAssignments = {
    ...employee,
    assignments: [
      { ...assignment1, employee },
      { ...assignment2, employee },
    ],
  };

  const roles = [
    {
      ...role1,
      assignments: [{ ...assignment1, employee: employeeWithAssignments }],
    },
    {
      ...role2,
      assignments: [
        {
          ...assignment2,
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
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="Employee assigned to 2 roles one after the other"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
      employees={employees}
    />
  );
};

BenchUseCase4.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const BenchUseCase5: ComponentStory<
  typeof ProjectionsContainer
> = () => {
  const dashboardStart = new Date(2018, 0, 1);
  const skill = { id: "1001", name: "React" };
  const role = {
    id: "1",
    startDate: new Date(2018, 0, 1),
    startConfidence: 1,
    endDate: new Date(2018, 0, 14),
    endConfidence: 0.7,
    project: projects[0],
    skills: [skill],
  };

  const assignment = {
    id: "2",
    role,
    startDate: new Date(2018, 0, 1),
    endDate: new Date(2018, 0, 7),
  };

  const assignment2 = {
    id: "3",
    role,
    startDate: new Date(2018, 0, 8),
    endDate: new Date(2018, 0, 14),
  };

  const employee = {
    id: "20",
    name: "John Doe",
    skills: [skill],
  };

  const employee2 = {
    id: "21",
    name: "Jane Doe",
    skills: [skill],
  };

  const employeeWithAssignments = {
    ...employee,
    assignments: [{ ...assignment, employee }],
  };

  const employee2WithAssignments = {
    ...employee2,
    assignments: [{ ...assignment2, employee: employee2 }],
  };

  const roles = [
    {
      ...role,
      assignments: [
        {
          ...assignment,
          employee: employeeWithAssignments,
        },
        {
          ...assignment2,
          employee: employee2WithAssignments,
        },
      ],
    },
  ];
  const employees = [employeeWithAssignments, employee2WithAssignments];

  const skillsWithRoles = [
    {
      ...skill,
      roles,
      employees,
    },
  ];

  const { skillsWithProjection } = useProjection(
    dashboardStart,
    skillsWithRoles,
  );

  const projections = skillsWithProjection[0].projections;
  return (
    <ProjectionsContainer
      title="2 Employees Assigned for a week and then unassigned"
      dashboardStart={dashboardStart}
      roles={roles}
      skill={skill}
      projections={projections}
      employees={employees}
    />
  );
};

BenchUseCase5.parameters = {
  controls: { hideNoControlsWarning: true },
};
