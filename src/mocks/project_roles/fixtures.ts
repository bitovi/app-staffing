import faker from "faker";
import { projects } from "../projects/fixtures";
import { ProjectRecord } from "../../services/api/Projects/Projects";
import {roles, JSONRole} from "../roles/fixtures";
import { ProjectRoleTable } from "../../services/api/Roles/Roles";

faker.seed(0);

let id = 0;
const maxNumberOfSkillsGenerated = 3;

const populateJoinTable = (
  roles: JSONRole[],
  projects: ProjectRecord[],
): ProjectRoleTable[] => {
  const project_role_table: ProjectRoleTable[] = [];

  roles.map((role) => {
    const projectIdList: { id: string }[] = faker.random
      .arrayElements(
        projects,
        faker.datatype.number(maxNumberOfSkillsGenerated) + 1,
      )
      .map(({ id }) => ({ id }));

    projectIdList.forEach((project) => {
      project_role_table.push({
        id: `${++id}`,
        role_id: role.id,
        skill_id: project.id,
      });
    });
  });

  return project_role_table;
};

export const projectRoles: ProjectRoleTable[] = populateJoinTable(
  roles,
  projects,
);
