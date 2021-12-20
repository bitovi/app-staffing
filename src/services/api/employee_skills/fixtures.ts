import faker from "faker";
import { employees } from "../employees/fixtures";
import { EmployeeRecord } from "../employees/interfaces";
import { skills } from "../skills/fixtures";
import { Skill } from "../skills/interfaces";
import { EmployeeSkillTable } from "./interfaces";

faker.seed(0);

let id = 0;
const maxNumberOfSkillsGenerated = 3;

const populateJoinTable = (
  skills: Skill[],
  employees: EmployeeRecord[],
): EmployeeSkillTable[] => {
  const employee_skill_table: EmployeeSkillTable[] = [];

  skills.map((skill) => {
    const employeeIdList: { id: string }[] = faker.random
      .arrayElements(
        employees,
        faker.datatype.number(maxNumberOfSkillsGenerated) + 1,
      )
      .map(({ id }) => ({ id }));

    employeeIdList.forEach((employee) => {
      employee_skill_table.push({
        id: `${++id}`,
        employee_id: employee.id,
        skill_id: skill.id,
      });
    });
  });

  return employee_skill_table;
};

export const employeesSkills: EmployeeSkillTable[] = populateJoinTable(
  skills,
  employees,
);
