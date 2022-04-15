import {
  Box,
  Center,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import differenceInDays from "date-fns/differenceInDays";
import { max, min } from "date-fns/esm";
import { projects } from "../../../mocks/fixtures";
import TableHeader from "../../../pages/Dashboard/components/ReportTable/TableHeader";
import TableRow from "../../../pages/Dashboard/components/ReportTable/TableRow";
import { Assignment, Employee, Role, Skill } from "../../api";
import { TimelineRange } from "../timeline";
import useProjection from "../useProjection";
import useTimeline from "../useTimeline";
import { Projection } from "./projections";

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
    <>
      <Heading size="md" mb="40px">
        {title}
      </Heading>

      <UnorderedList mb="1em" color="blue">
        {roles.map((role) => (
          <ListItem key={role.id}>
            Role: {role.startConfidence * 100}% {role.startDate.toDateString()},{" "}
            {role.endConfidence && role.endDate
              ? `${role.endConfidence * 100}% ${role.endDate.toDateString()}`
              : "null"}
            <UnorderedList color="red">
              {role.assignments && role.assignments.length > 0 ? (
                role.assignments.map((assignment) => (
                  <ListItem key={assignment.id}>
                    Assignment: {assignment.startDate.toDateString()},{" "}
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
          <Box>
            <Line data={role} timeline={timeline} isRole />
            {role.assignments &&
              role.assignments.map((assignment) => (
                <Line data={assignment} timeline={timeline} />
              ))}
          </Box>
        ))}
      </Box>

      <Flex flexDirection="column">
        <TableHeader
          timeline={timeline}
          columnLabel={"DEPARTMENT"}
        ></TableHeader>
        <TableRow skill={skill} projections={projections} />
      </Flex>
    </>
  );
};

export default {
  title: "API/Projections",
  component: ProjectionsContainer,
} as ComponentMeta<typeof ProjectionsContainer>;

export const NeededUseCase1: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const roles = [
      {
        id: "1",
        startDate: new Date(2022, 3, 11),
        startConfidence: 1,
        endDate: new Date(2022, 3, 17),
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

export const NeededUseCase2: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role = {
      id: "1",
      startDate: new Date(2022, 3, 11),
      startConfidence: 1,
      endDate: new Date(2022, 3, 17),
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
            startDate: new Date(2022, 3, 12),
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

export const NeededUseCase3: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role = {
      id: "1",
      startDate: new Date(2022, 3, 11),
      startConfidence: 1,
      endDate: new Date(2022, 5, 11),
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
            startDate: new Date(2022, 3, 12),
            endDate: new Date(2022, 3, 26),
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

export const NeededUseCase4: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role = {
      id: "1",
      startDate: new Date(2022, 3, 11),
      startConfidence: 0.8,
      endDate: new Date(2022, 3, 24),
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

export const NeededUseCase5: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role = {
      id: "1",
      startDate: new Date(2022, 3, 11),
      startConfidence: 0.8,
      endDate: new Date(2022, 3, 24),
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
            startDate: new Date(2022, 3, 19),
            endDate: new Date(2022, 3, 20),
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

export const NeededUseCase6: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role = {
      id: "1",
      startDate: new Date(2022, 3, 11),
      startConfidence: 0.8,
      endDate: new Date(2022, 3, 24),
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
            startDate: new Date(2022, 3, 18),
            endDate: new Date(2022, 3, 24),
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

export const NeededUseCase7: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role = {
      id: "1",
      startDate: new Date(2022, 3, 14),
      startConfidence: 0.8,
      endDate: new Date(2022, 3, 22),
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

export const BenchUseCase1: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role = {
      id: "1",
      startDate: new Date(2022, 3, 11),
      startConfidence: 1,
      endDate: new Date(2022, 3, 24),
      endConfidence: 0.7,
      project: projects[0],
      skills: [skill],
    };

    const assignment = {
      id: "2",
      role,
      startDate: new Date(2022, 3, 11),
      endDate: new Date(2022, 3, 17),
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

export const BenchUseCase2: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role = {
      id: "1",
      startDate: new Date(2022, 3, 11),
      startConfidence: 1,
      endDate: new Date(2022, 3, 24),
      endConfidence: 1,
      project: projects[0],
      skills: [skill],
    };

    const assignment = {
      id: "2",
      role,
      startDate: new Date(2022, 3, 11),
      endDate: new Date(2022, 3, 24),
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

export const BenchUseCase3: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role = {
      id: "1",
      startDate: new Date(2022, 3, 11),
      startConfidence: 1,
      endDate: new Date(2022, 3, 24),
      endConfidence: 0.7,
      project: projects[0],
      skills: [skill],
    };

    const assignment = {
      id: "2",
      role,
      startDate: new Date(2022, 3, 11),
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

export const BenchUseCase4: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role1 = {
      id: "1",
      startDate: new Date(2022, 3, 11),
      startConfidence: 1,
      endDate: new Date(2022, 3, 17),
      endConfidence: 0.8,
      project: projects[0],
      skills: [skill],
    };

    const role2 = {
      id: "2",
      startDate: new Date(2022, 3, 18),
      startConfidence: 1,
      endDate: new Date(2022, 3, 24),
      endConfidence: 0.6,
      project: projects[0],
      skills: [skill],
    };

    const assignment1 = {
      id: "101",
      role: role1,
      startDate: new Date(2022, 3, 11),
    };

    const assignment2 = {
      id: "102",
      role: role2,
      startDate: new Date(2022, 3, 18),
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

export const BenchUseCase5: ComponentStory<typeof ProjectionsContainer> =
  () => {
    const dashboardStart = new Date(2022, 3, 11);
    const skill = { id: "1001", name: "React" };
    const role = {
      id: "1",
      startDate: new Date(2022, 3, 11),
      startConfidence: 1,
      endDate: new Date(2022, 3, 24),
      endConfidence: 0.7,
      project: projects[0],
      skills: [skill],
    };

    const assignment = {
      id: "2",
      role,
      startDate: new Date(2022, 3, 11),
      endDate: new Date(2022, 3, 17),
    };

    const assignment2 = {
      id: "3",
      role,
      startDate: new Date(2022, 3, 18),
      endDate: new Date(2022, 3, 24),
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

const Line = ({
  data,
  timeline,
  isRole,
}: {
  data: Role | Assignment;
  timeline: TimelineRange[];
  isRole?: boolean;
}) => {
  let isUnbound = false;
  let startTime = 0;
  let duration = 0;
  let totalNumOfDays = 0;

  const roleStart = data.startDate;
  let roleEnd = data.endDate;

  if (!roleEnd) {
    roleEnd = timeline[timeline.length - 1].endDate;
    isUnbound = true;
  }

  for (const [index, period] of timeline.entries()) {
    const { startDate: periodStart, endDate: periodEnd } = period;
    const numOfDays = Math.round(
      Math.abs(
        (periodStart.valueOf() - periodEnd.valueOf()) / (24 * 60 * 60 * 1000),
      ),
    );
    totalNumOfDays += numOfDays;
    if (periodEnd < roleStart) {
      continue;
    }
    if (periodStart > roleEnd) {
      break;
    }

    if (!startTime) {
      startTime =
        (differenceInDays(roleStart, timeline[0].startDate) * (index + 1)) /
        totalNumOfDays;
    }

    const start = max([periodStart, roleStart]);
    const end = min([periodEnd, roleEnd]);

    duration += (differenceInDays(end, start) + 1) / numOfDays;
    console.log({ duration });
  }

  return (
    <Flex flex={1} height={8} mb={2} alignItems={"start"}>
      <Center width="3xs" justifyContent={"start"}></Center>

      <Box style={{ position: "relative" }}>
        {isRole && (
          <span
            style={{
              position: "absolute",
              fontSize: "12px",
              fontWeight: "bold",
              marginTop: "5px",
              marginLeft: `calc(${startTime} * 11vw)`,
            }}
          >
            {"startConfidence" in data && `${data.startConfidence * 100}%`}
          </span>
        )}
        <Box
          background={isRole ? "blue" : "red"}
          ml={`calc(${startTime} * 11vw)`}
          h={1}
          w={
            isUnbound ? `calc(${duration} * 5rem)` : `calc(${duration} * 11vw)`
          }
        />
        {isUnbound && (
          <Box
            style={{
              width: 0,
              height: 0,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: "10px solid red",
              position: "absolute",
              right: -2,
              top: "-8px",
            }}
          />
        )}
        {isRole && (
          <span
            style={{
              position: "absolute",
              fontSize: "12px",
              fontWeight: "bold",
              marginTop: "1px",
              right: 0,
            }}
          >
            {"endConfidence" in data &&
              data.endConfidence &&
              `${data.endConfidence * 100}%`}
          </span>
        )}
      </Box>

      <Box w={28} />
    </Flex>
  );
};
