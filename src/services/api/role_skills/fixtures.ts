import faker from "faker";
import { roles } from "../roles/fixtures";
import { RoleTable } from "../roles/interfaces";
import { skills } from "../skills/fixtures";
import { Skill } from "../skills/interfaces";
import { RoleSkillTable } from "./interfaces";

faker.seed(0);

let id = 0;
const maxNumberOfSkillsGenerated = 3;

const populateJoinTable = (
  skills: Skill[],
  roles: RoleTable[],
): RoleSkillTable[] => {
  const role_skill_table: RoleSkillTable[] = [];
  // const role_skill: RoleSkillTable = {
  //   id: "1",
  //   role_id: role.id,
  //   skill_id: skill.id,
  // }

  skills.map((skill) => {
    const roleIdList: { id: string }[] = faker.random
      .arrayElements(
        roles,
        faker.datatype.number(maxNumberOfSkillsGenerated) + 1,
      )
      .map(({ id }) => ({ id }));

    roleIdList.forEach((role) => {
      role_skill_table.push({
        id: `${++id}`,
        role_id: role.id,
        skill_id: skill.id,
      });
    });
  });

  return role_skill_table;
};

export const rolesSkills: RoleSkillTable[] = populateJoinTable(skills, roles);
