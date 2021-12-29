import { v4 as uuidv4 } from "uuid";
import { rest } from "msw";
import type { RestHandler, DefaultRequestBody, MockedRequest } from "msw";
import { CanLocalStore } from "can-local-store";

import { JSONAPI, MockResponse } from "../baseMocks/interfaces";
import { JSONAPIDocument, ResourceObject } from "json-api-serializer";
import { JSONProject } from "./fixtures";
import { JSONRole } from "../roles/fixtures";
import { ProjectRecord } from "../../services/api/Projects/Projects";
import { getAll } from "./handlers";
import { projectRolesStoreManager } from "../project_roles/mocks";

type ProjectResource = ResourceObject<ProjectRecord>;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function requestCreatorProject<Resource extends ProjectRecord>(
  resourcePath: string,
  store: CanLocalStore<Resource>,
): { [requestType: string]: RestHandler<MockedRequest<DefaultRequestBody>> } {
  const basePath = `${API_BASE_URL}${resourcePath}`;

  return {
    getOne: rest.get(`${basePath}/:id`, async (req, res, ctx) => {
      const id = req.params.id;
      const item = await store.getData({ id });

      if (!item) {
        return res(
          ctx.status(404),
          ctx.json({
            error: `Resource ${id} not found.`,
          }),
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          data: item,
        }),
      );
    }),

    update: rest.put<Partial<Resource>, MockResponse<Resource>, { id: string }>(
      `${API_BASE_URL}${resourcePath}/:id`,
      async (req, res, ctx) => {
        const id = req.params.id;
        // const index = collection.findIndex((item) => item.id === id);
        const itemExists = await store.getData({ id });

        if (!itemExists) {
          return res(
            ctx.status(404),
            ctx.json({
              error: `Resource ${id} not found.`,
            }),
          );
        }

        const updatedItem = await store.updateData({ ...req.body, id });

        if (!updatedItem) {
          return res(
            ctx.status(400),
            ctx.json({
              error: `Could not update Resource with id: ${id}`,
            }),
          );
        }

        return res(
          ctx.status(201),
          ctx.json({
            data: updatedItem,
          }),
        );
      },
    ),

    delete: rest.delete(`${basePath}/:id`, async (req, res, ctx) => {
      const id = req.params.id;
      const resourceToDelete = await store.getData({ id });

      if (!resourceToDelete) {
        return res(
          ctx.status(404),
          ctx.json({
            error: `Project ${id} not found.`,
          }),
        );
      }

      try {
        const joinTable = await projectRolesStoreManager.store.getListData({
          filter: {
            role_id: id,
          },
        });

        await Promise.all(
          joinTable.data.map((record) => {
            projectRolesStoreManager.store.destroyData(record);
          }),
        );
        await store.destroyData(resourceToDelete);

        return res(ctx.status(200), ctx.json({}));
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }),

    // type RestHandler = <RequestBody, ResponseBody, RequestParams>(mask, resolver) => MockedResponse
    create: rest.post<JSONAPIDocument>(basePath, async (req, res, ctx) => {
      const id = uuidv4();
      const { attributes, relationships } = req.body.data as ProjectResource;
      if (!attributes) return res(ctx.status(400));

      const rolesData = relationships?.roles?.data;
      const response = { ...req.body };
      response.data = {
        ...response.data,
        id,
      } as ProjectResource;

      // Persist data to the Project store
      const newProjectTableEntry: ProjectRecord = {
        id,
        name: attributes.name,
        description: attributes.description,
      };

      try {
        if (Array.isArray(rolesData)) {
          const projectRolesTableJoins = rolesData.map((role) => ({
            id: uuidv4(),
            role_id: role.id,
            skill_id: id,
          }));

          await Promise.all(
            projectRolesTableJoins.map(async (skillJoin) => {
              await projectRolesStoreManager.store.createData(skillJoin);
            }),
          );
        }
        await store.createData(newProjectTableEntry as Resource);
        return res(ctx.status(201), ctx.json(response));
      } catch (error) {
        return res(
          ctx.status(500),
          ctx.json({
            status: "500",
            title: (error as Error).message,
          }),
        );
      }
    }),

    getAll: rest.get<JSONAPI<JSONProject[], JSONRole[]>>(
      basePath,
      async (req, res, ctx) => {
        try {
          const response = await getAll(store, req.url.searchParams.toString());
          return res(ctx.status(200), ctx.json(response));
        } catch (error) {
          return res(
            ctx.status(500),
            ctx.json({
              errors: [
                {
                  status: "500",
                  source: { pointer: "" },
                  title: "Internal Server Error",
                  detail: (error as Error).message,
                },
              ],
            }),
          );
        }
      },
    ),
  };
}
