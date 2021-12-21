import deparam from "can-deparam";
import isEmpty from "lodash/isEmpty";
import { CanLocalStore } from "can-local-store";
import { JSONAPIDocument } from "json-api-serializer";

import { EmployeeRecord } from "../interfaces";
import { Skill } from "../../skills/interfaces";
import { skillStoreManager } from "../../skills/mocks";
import { employeeSkillsStoreManager } from "../../employee_skills/mocks";
import serializer from "../../../restBuilder/getJsonApiSerializer";

/**
 * Mock handler for the GET /employees endpoint
 * @param store - The fixture data store
 * @param qs - The request query string
 */
export default async function getAll(
  store: CanLocalStore<EmployeeRecord>,
  qs: string,
): Promise<JSONAPIDocument> {
  const { filter, sort, page = 1, count = 25, include = "" } = deparam(qs);
  const includeList = isEmpty(include) ? [] : include.split(",");

  const { data: employeesRecords }: { data: EmployeeRecord[] } =
    await store.getListData({
      filter,
      sort,
      page: {
        start: (page - 1) * count,
        end: page * count - 1,
      },
    });

  const employees = await Promise.all(
    employeesRecords.map(async (employee) => {
      const relationships = await getRelationships(employee, includeList);
      return {
        ...employee,
        ...relationships,
      };
    }),
  );

  return serializer.serialize("employees", employees);
}

interface RelationshipsGetter {
  skills: (employee: EmployeeRecord) => Promise<Skill[]>;
}

interface EmployeeRelationships {
  skills?: Skill[];
}

const relationshipsGetter: RelationshipsGetter = {
  async skills(employee: EmployeeRecord) {
    const { data: employeeSkills } =
      await employeeSkillsStoreManager.store.getListData({
        filter: {
          employee_id: employee.id,
        },
      });

    const skillsIds = employeeSkills.map((es) => es.skill_id);
    const { data: skillsRecords } = await skillStoreManager.store.getListData({
      filter: {
        id: skillsIds,
      },
    });

    return skillsRecords;
  },
};

/**
 * Retrieves the employee relationships data
 * @param employee - The employee to compute relationships from
 * @param include - The list of relationship names to attach to the resource object
 */
async function getRelationships(
  employee: EmployeeRecord,
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
      relationships[relationship] = data;
    }),
  );

  return relationships;
}
