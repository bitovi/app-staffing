import type {
  Assignment,
  Employee,
  Project,
  Role,
  Skill,
} from "../services/api";

import { assignments as _assignments } from "./assignments/fixtures";
import { employees as _employees } from "./employees/fixtures";
import { projects as _projects } from "./projects/fixtures";
import { roles as _roles } from "./roles/fixtures";
import { skills as _skills } from "./skills/fixtures";

import serializer from "../services/api/restBuilder/serializer";

export type { JSONAssignment } from "./assignments/fixtures";
export type { JSONEmployee } from "./employees/fixtures";
export type { JSONProject } from "./projects/fixtures";
export type { JSONRole } from "./roles/fixtures";
export type { JSONSkill } from "./skills/fixtures";

interface DeserializedEmployee
  extends Omit<Employee, "assignments" | "skills"> {
  assignments: string[];
  skills: string[];
}

interface DeserializedProject extends Omit<Project, "roles"> {
  assignments: string[];
  skills: string[];
}

interface DeserializedRole
  extends Omit<Employee, "assignments" | "skills" | "project"> {
  assignments: string[];
  skills: string[];
  project: string;
}

interface DeserializedAssignment extends Omit<Employee, "employee" | "role"> {
  employee: string;
  role: string;
  project: string;
}

const deserializedEmployees = serializer.deserialize("employees", {
  data: _employees,
}) as DeserializedEmployee[];

const deserializedProjects = serializer.deserialize("projects", {
  data: _projects,
}) as DeserializedProject[];

const deserializedRoles = serializer.deserialize("roles", {
  data: _roles,
}) as DeserializedRole[];

const deserializedAssignments = serializer.deserialize("assignments", {
  data: _assignments,
}) as DeserializedAssignment[];

const deserializedSkills = serializer.deserialize("skills", {
  data: _skills,
}) as Skill[];

const createEmployees = (): Employee[] => {
  return deserializedEmployees.map((employee) => {
    const employeeSkills = employee.skills.map((skillId) => {
      const matchingSkill = deserializedSkills.find(({ id }) => id === skillId);

      if (!matchingSkill) {
        throw new Error(
          `Fixture Error: Could not find skill with id ${skillId}`,
        );
      }

      return matchingSkill;
    });

    return {
      ...employee,
      skills: employeeSkills,
      assignments: [],
    };
  });
};

const createProjects = (): Project[] => {
  return deserializedProjects.map((project) => {
    return {
      ...project,
      roles: [],
    };
  });
};

const createAndAddAssignment = (
  employees: Employee[],
): { employees: Employee[]; assignments: Assignment[] } => {
  const assignments: Assignment[] = [];
  const employeeIdToAssignment: Record<string, Assignment[]> = {};

  for (const deserializedAssignment of deserializedAssignments) {
    const matchingEmployee = employees.find(
      ({ id }) => deserializedAssignment.employee === id,
    );

    if (!matchingEmployee) {
      throw new Error();
    }

    const assignment = {
      ...deserializedAssignment,
      employee: matchingEmployee,
      role: {} as Role, // Role added later
    };

    assignments.push(assignment);

    if (!employeeIdToAssignment[matchingEmployee.id]) {
      employeeIdToAssignment[matchingEmployee.id] = [];
    }

    employeeIdToAssignment[matchingEmployee.id].push(assignment);
  }

  return {
    assignments,
    employees: employees.map((employee) => {
      const assignments = employeeIdToAssignment[employee.id];
      if (assignments) {
        return { ...employee, assignments };
      }

      return employee;
    }),
  };
};

const createAndAddRoles = (
  projects: Project[],
  assignments: Assignment[],
): {
  projects: Project[];
  assignments: Assignment[];
  roles: Role[];
} => {
  const roles: Role[] = [];
  const projectIdToRole: Record<string, Role[]> = {};
  const assignmentIdToRole: Record<string, Role> = {};

  for (const deserializedRole of deserializedRoles) {
    const roleAssignments = deserializedRole.assignments.map((assignmentId) => {
      const matchingAssignment = assignments.find(
        ({ id }) => id === assignmentId,
      );

      if (!matchingAssignment) {
        throw new Error();
      }

      return matchingAssignment;
    });

    const roleSkills = deserializedRole.skills.map((skillId) => {
      const matchingSkill = deserializedSkills.find(({ id }) => id === skillId);

      if (!matchingSkill) {
        throw new Error(
          `Fixture Error: Could not find skill with id ${skillId}`,
        );
      }

      return matchingSkill;
    });

    const matchingProject = projects.find(
      ({ id }) => deserializedRole.project === id,
    );

    if (!matchingProject) {
      throw new Error();
    }

    const role = {
      ...deserializedRole,
      assignments: roleAssignments,
      project: matchingProject,
      skills: roleSkills,
    };

    roles.push(role);
    roleAssignments.forEach((a) => {
      assignmentIdToRole[a.id] = role;
    });

    if (!projectIdToRole[matchingProject.id]) {
      projectIdToRole[matchingProject.id] = [];
    }

    projectIdToRole[matchingProject.id].push(role);
  }

  return {
    roles,
    projects: projects.map((project) => {
      const roles = projectIdToRole[project.id];
      if (roles) {
        return { ...project, roles };
      }

      return project;
    }),
    assignments: assignments.map((assigment) => {
      const role = assignmentIdToRole[assigment.id];
      if (role) {
        return { ...assigment, role };
      }

      return assigment;
    }),
  };
};

const create = (): {
  skills: Skill[];
  projects: Project[];
  assignments: Assignment[];
  roles: Role[];
  employees: Employee[];
} => {
  const skills = deserializedSkills;
  const initialProjects = createProjects();
  const initialEmployees = createEmployees();
  const { employees, assignments: assignmentsNoRoles } =
    createAndAddAssignment(initialEmployees);

  const { projects, assignments, roles } = createAndAddRoles(
    initialProjects,
    assignmentsNoRoles,
  );

  return {
    skills,
    projects,
    assignments,
    roles,
    employees,
  };
};

export const { skills, projects, assignments, roles, employees } = create();
