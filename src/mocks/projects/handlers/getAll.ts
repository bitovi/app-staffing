import deparam from "can-deparam";
import isEmpty from "lodash/isEmpty";
import { CanLocalStore } from "can-local-store";
import { JSONAPIDocument } from "json-api-serializer";

import serializer from "../../../services/api/restBuilder/serializer";
import { Role } from "../../../services/api";
import { rolesStoreManager } from "../../roles/mocks";
import { Project } from "../../../services/api/Projects/Projects";
import { projectRolesStoreManager } from "../../project_roles/mocks";

/**
 * Mock handler for the GET /projects endpoint
 * @param store - The fixture data store
 * @param qs - The request query string
 */
export default async function getAll(
  store: CanLocalStore<Project>,
  qs: string,
): Promise<JSONAPIDocument> {
  const { filter, sort, page = 1, count = 25, include = "" } = deparam(qs);
  const includeList = isEmpty(include) ? [] : include.split(",");

  const { data: projectRecords }: { data: Project[] } = await store.getListData(
    {
      filter,
      sort,
      page: {
        start: (page - 1) * count,
        end: page * count - 1,
      },
    },
  );

  const projects = await Promise.all(
    projectRecords.map(async (project) => {
      const relationships = await getRelationships(project, includeList);
      return {
        ...project,
        ...relationships,
      };
    }),
  );

  return serializer.serialize("projects", projects);
}

interface RelationshipsGetter {
  roles: (project: Project) => Promise<Role[]>;
}

interface ProjectRelationships {
  roles?: Role[];
}

const relationshipsGetter: RelationshipsGetter = {
  async roles(project: Project) {
    const { data: projectRoles } =
      await projectRolesStoreManager.store.getListData({
        filter: {
          role_id: project.id,
        },
      });

    const rolesId = projectRoles.map((es) => es.id);
    const { data: roleRecords } = await rolesStoreManager.store.getListData({
      filter: {
        id: rolesId,
      },
    });

    return roleRecords;
  },
};

/**
 * Retrieves the project relationships data
 * @param project - The project to compute relationships from
 * @param include - The list of relationship names to attach to the resource object
 */
async function getRelationships(
  project: Project,
  include: Array<keyof RelationshipsGetter>,
) {
  const relationships: ProjectRelationships = {};

  await Promise.all(
    include.map(async (relationship) => {
      const getRelationshipData = relationshipsGetter[relationship];

      if (!getRelationshipData) {
        throw new Error(
          `Project relationship ${relationship} is not supported`,
        );
      }

      const data = await getRelationshipData(project);
      relationships[relationship] = data;
    }),
  );
  return relationships;
}
