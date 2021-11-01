import { rest } from "msw";
import type { RestHandler, DefaultRequestBody, MockedRequest } from "msw";
import deparam from "can-deparam";
import { CanLocalStore } from "can-local-store";

import type { QueriableList } from "../shared";

import { MockResponse } from "../baseMocks/interfaces";
import { skillStoreManager } from "../skills/mocks";
import { employeeSkillsStoreManager } from "../employee_skills/mocks";

export default function requestCreatorEmployee<Resource extends { id: string }>(
  resourcePath: string,
  store: CanLocalStore<Resource>,
): { [requestType: string]: RestHandler<MockedRequest<DefaultRequestBody>> } {
  const basePath = "/api/v1";

  return {
    getOne: rest.get<undefined, MockResponse<Resource>, { id: string }>(
      `${basePath}${resourcePath}/:id`,
      async (req, res, ctx) => {
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
      },
    ),
    update: rest.put<Partial<Resource>, MockResponse<Resource>, { id: string }>(
      `${basePath}${resourcePath}/:id`,
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
    delete: rest.delete<undefined, MockResponse, { id: string }>(
      `${basePath}${resourcePath}/:id`,
      async (req, res, ctx) => {
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

        await store.destroyData(resourceToDelete);

        return res(ctx.status(200), ctx.json({}));
      },
    ),
    create: rest.post<Omit<Resource, "id">, MockResponse<Resource>>(
      `${basePath}${resourcePath}`,
      async (req, res, ctx) => {
        const id = (Math.floor(Math.random() * 1000) + 1).toString();
        const item = { ...req.body, id } as Resource; // @TODO: look into typing issue

        await store.createData(item);

        return res(ctx.status(201), ctx.json({ data: item }));
      },
    ),

    getAll: rest.get<
      undefined,
      MockResponse<Resource[], { total: number }>,
      QueriableList<Resource>
    >(`${basePath}${resourcePath}`, async (req, res, ctx) => {
      const {
        filter,
        sort,
        page = 1,
        count = 25,
      } = deparam(req.url.searchParams.toString());

      const employeeSkillsData =
        await employeeSkillsStoreManager.store.getListData();
      const skillData = await skillStoreManager.store.getListData();

      console.log("employeeSkillsData", employeeSkillsData);
      console.log("skillData", skillData);

      const { data, count: total } = await store.getListData({
        filter,
        sort,
        page: {
          start: (page - 1) * count,
          end: page * count - 1,
        },
      });

      return res(
        ctx.status(200),
        ctx.json({
          data,
          metadata: {
            total,
            pages: Math.ceil(total / count),
          },
        }),
      );
    }),
  };
}
