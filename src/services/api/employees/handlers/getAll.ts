import deparam from "can-deparam";
import isEmpty from "lodash/isEmpty";
import { CanLocalStore } from "can-local-store";

import { skillStoreManager } from "../../skills/mocks";
import { employeeSkillsStoreManager } from "../../employee_skills/mocks";
import { EmployeeTable, EmployeeJSON } from "../interfaces";
import { JSONSkill } from "../../skills/interfaces";

interface EmployeesDocument {
  data: EmployeeJSON[];
  included?: JSONSkill[];
}

/**
 * Mock handler for the GET /employees endpoint
 * @param store - The fixture data store
 * @param qs - The request query string
 */
export default async function getAll(
  store: CanLocalStore<EmployeeTable>,
  qs: string,
): Promise<EmployeesDocument> {
  const { filter, sort, page = 1, count = 25, include = "" } = deparam(qs);
  const includeList = isEmpty(include) ? [] : include.split(",");

  const { data: employeesRecords }: { data: EmployeeTable[] } =
    await store.getListData({
      filter,
      sort,
      page: {
        start: (page - 1) * count,
        end: page * count - 1,
      },
    });

  const employees = await Promise.all(
    employeesRecords.map((employee) =>
      hydrateEmployeeRecord(employee, includeList),
    ),
  );
  const included = await getRelatedResources(employees, includeList);

  return {
    data: employees,
    ...(included.length ? { included } : null),
  };
}

interface SkillRelationship {
  type: "skills";
  id: string;
}

interface RelationshipsGetter {
  skills: (employee: EmployeeTable) => Promise<SkillRelationship[]>;
}

interface RelatedResourcesGetter {
  skills: (employees: EmployeeJSON[]) => Promise<JSONSkill[]>;
}

const relationshipsGetter: RelationshipsGetter = {
  async skills(employee: EmployeeTable) {
    const { data: employeeSkills } =
      await employeeSkillsStoreManager.store.getListData({
        filter: {
          employee_id: employee.id,
        },
      });
    return employeeSkills.map((skill) => {
      return {
        type: "skills",
        id: skill.skill_id,
      };
    });
  },
};

const relatedResourcesGetter: RelatedResourcesGetter = {
  async skills(employees: EmployeeJSON[]) {
    const skillsIds = getIncludedSkillsIds(employees);

    const { data: skillsRecords } = await skillStoreManager.store.getListData({
      filter: {
        id: skillsIds,
      },
    });

    return skillsRecords.map(
      (skill) =>
        ({
          type: "skills",
          id: skill.id,
          attributes: {
            name: skill.name,
          },
        } as JSONSkill),
    );
  },
};

async function hydrateEmployeeRecord(
  employee: EmployeeTable,
  include: Array<keyof RelationshipsGetter>,
) {
  const relationships = await getRelationships(employee, include);

  return {
    type: "employees",
    id: employee.id,
    attributes: {
      name: employee.name,
      startDate: employee.startDate,
      endDate: employee.endDate,
    },
    ...(isEmpty(relationships) ? {} : { relationships }),
  } as EmployeeJSON;
}

interface EmployeeRelationships {
  skills?: { data: SkillRelationship[] };
}

/**
 * Computes the data for the `relationship` property of the Employee resource object
 * @param employee - The employee to compute relationships from
 * @param include - The list of relationship names to attach to the resource object
 */
async function getRelationships(
  employee: EmployeeTable,
  include: Array<keyof RelationshipsGetter>,
) {
  const relationships: EmployeeRelationships = {};

  await Promise.all(
    include.map(async (relationship) => {
      const getRelationshipData = relationshipsGetter[relationship];

      if (!getRelationshipData) {
        throw new Error(
          `Employee relationship ${relationship} is not supported`,
        );
      }

      const data = await getRelationshipData(employee);
      relationships[relationship] = { data };
    }),
  );

  return relationships;
}

/**
 * Computes the data for `included` property of the JSON API response
 */
async function getRelatedResources(
  employees: EmployeeJSON[],
  include: Array<keyof RelatedResourcesGetter>,
): Promise<JSONSkill[]> {
  const included: JSONSkill[] = [];

  await Promise.all(
    include.map(async (relationship) => {
      const getRelatedData = relatedResourcesGetter[relationship];

      if (!getRelatedData) {
        throw new Error(
          `Employee relationship ${relationship} is not supported`,
        );
      }

      const data = await getRelatedData(employees);
      included.push(...data);
    }),
  );

  return included;
}

function getIncludedSkillsIds(employees: EmployeeJSON[]) {
  const ids = new Set<string>();

  employees.forEach((employee) => {
    const skills = employee.relationships?.skills.data || [];

    skills.forEach((skill) => {
      ids.add(skill.id);
    });
  });

  return [...ids];
}
