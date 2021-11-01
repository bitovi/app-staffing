import { TimescaleData } from "../../../../services/timeReport/timesReport";
import { ProjectedData, ProjectRolesNeed, RoleProjection } from "../../../../services/timeReport/interfaces";
import {
  Employee,
  Project,
  Role,
  Skill,
  useEmployees,
  useProjects,
  useRoles,
  useSkills,
} from "../../../../services/api";
import { isWithinInterval } from "date-fns";

type useProjectionProps = {
  timeFrames: TimescaleData[];
};

const SELL_THRESHOLD = 2;

/**
 * hook used for fetching dashboard data.
 */
function useProjection({ timeFrames }: useProjectionProps): {
  isLoading: boolean;
  projectedData: ProjectedData[];
  error?: Error;
} {
  const projectedData: ProjectedData[] = [];

  // fetch roles;
  const { roles, isLoading: roleLoading, error: roleError } = useRoles({});

  // fetch projects;
  const {
    projects,
    isLoading: projectLoading,
    error: projectError,
  } = useProjects({
    filter: {}, // fetch projects in range.
  });

  // fetch employees;
  const {
    employees,
    isLoading: employeesLoading,
    error: employeeError,
  } = useEmployees({});

  // useEffect(() => {}, []);
  const { skills, isLoading: skillsLoading, error: skillsError } = useSkills();

  if (skills && employees && projects && roles) {
    for (const skill of skills) {
      const projection: ProjectedData = {
        role: skill.name,
        projections: getRoleProjectionsForSkill(
          skill,
          roles,
          projects,
          employees,
          timeFrames,
        ),
      };

      projectedData.push(projection);
    }
  }

  return {
    isLoading:
      roleLoading || projectLoading || employeesLoading || skillsLoading,
    error: projectError || employeeError || roleError || skillsError,
    projectedData,
  };
}

/*
  Created `RoleProjection` object for a given skill.
 */
function getRoleProjectionsForSkill(
  skill: Skill,
  roles: Role[],
  projects: Project[],
  employees: Employee[],
  timeframes: TimescaleData[],
): RoleProjection[] {
  const roleProjections: RoleProjection[] = [];

  for (const timeframe of timeframes) {
    const startDate = timeframe.startDate;
    const endDate = timeframe.endDate;

    // Find roles that overlap with start and end time.
    const rolesNeeded = getRolesForSkillInTimeFrame(
      startDate,
      endDate,
      skill,
      roles,
    );
    // group roles needed by project
    const needed: Array<ProjectRolesNeed> = groupRolesNeededByProject(
      rolesNeeded,
      projects,
    );

    const bench: Array<Employee> = getBenchedEmployeesInTimeFrame(
      startDate,
      endDate,
      employees,
    );

    roleProjections.push({
      needed,
      bench,
      action: getProjectedAction(0, 0),
    });
  }

  return roleProjections;
}

/**
 * Returns roles that fall within the given range.
 */
function getRolesForSkillInTimeFrame(
  startDate: Date,
  endDate: Date,
  skill: Skill,
  roles: Role[],
): Role[] {
  return roles.filter(
    (role) =>
      role.skill.id === skill.id &&
      role.startDate.date &&
      isWithinInterval(role.startDate.date, { start: startDate, end: endDate }),
  );
}

/*
  Finds employees for specific role
 */
function getBenchedEmployeesInTimeFrame(
  startDate: Date,
  endDate: Date,
  employees: Employee[],
): Employee[] {
  // @todo create logic to find employees with required skill that are free in the given time frame.
  //       needs a list of assigned employees.
  return [];
}

/*
  group roles by the the project the request them.
 */
function groupRolesNeededByProject(
  rolesNeededForProject: Role[],
  projects: Project[],
): Array<ProjectRolesNeed> {
  return rolesNeededForProject.reduce((acc, item) => {
    // find role in project;
    const project = projects.find((projectItem) =>
      projectItem.roles.some((roleItem) => roleItem.id === item.id),
    );

    const index = acc.findIndex((item) => item.projectName === project?.name);

    if (index >= 0) {
      acc[index].roles.push(item);
    } else {
      acc.push({
        projectName: project?.name || "",
        projectedConfidence: 1,
        roles: [item],
      });
    }

    return acc;
  }, [] as Array<ProjectRolesNeed>);
}

/*
  returns the corresponding action for Projection Data
 */
function getProjectedAction(
  needed: number,
  bench: number,
): "Ok" | "Hire" | "Sell" | "Assign" {
  // bench - needed > threshold -->  true --> sell
  if (bench - needed > SELL_THRESHOLD) {
    return "Sell";
  }

  // needed > bench -->  true --> hire
  if (needed > bench) {
    return "Hire";
  }

  // needed <= bench -->  true --> assign
  if (needed <= bench) {
    return "Assign";
  }

  return "Ok";
}

export default useProjection;
