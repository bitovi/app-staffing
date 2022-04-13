import { Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { projects } from "../../../mocks/fixtures";
import TableHeader from "../../../pages/Dashboard/components/ReportTable/TableHeader";
import TableRow from "../../../pages/Dashboard/components/ReportTable/TableRow";
import { Employee, Role, Skill } from "../../api";
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
  console.log(roles);

  return (
    <>
      <Heading size="md" mb="40px">
        {title}
      </Heading>

      <UnorderedList mb="1em">
        {roles.map((role) => (
          <ListItem key={role.id}>
            Role: {role.startConfidence * 100}% {role.startDate.toDateString()},{" "}
            {role.endConfidence && role.endDate
              ? `${role.endConfidence * 100}% ${role.endDate.toDateString()}`
              : "null"}
            <UnorderedList>
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
    console.log({ roles });
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
