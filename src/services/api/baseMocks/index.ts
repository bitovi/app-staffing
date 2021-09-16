import type { MockResponse, QueriableList } from "../shared";

import { rest } from "msw";
import { CanLocalStore } from "can-local-store";

export function requestCreator<Resource extends { id: string }>(
  resourcePath: string,
  store: CanLocalStore<Resource>,
) {
  const basePath = "/api/v1";

  return [
    rest.get<undefined, MockResponse<Resource>, { id: string }>(
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
    rest.put<Partial<Resource>, MockResponse<Resource>, { id: string }>(
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
    rest.delete<undefined, MockResponse, { id: string }>(
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
    rest.post<Omit<Resource, "id">, MockResponse<Resource>>(
      `${basePath}${resourcePath}`,
      async (req, res, ctx) => {
        const id = (Math.floor(Math.random() * 1000) + 1).toString();
        const item = { ...req.body, id } as Resource; // @TODO: look into typing issue

        await store.createData(item);

        return res(ctx.status(201), ctx.json({ data: item }));
      },
    ),

    rest.get<
      undefined,
      MockResponse<Resource[], { total: number }>,
      QueriableList<Resource>
    >(`${basePath}${resourcePath}`, async (req, res, ctx) => {
      const { filter, sort, page = 1, count = 25 } = req.params;

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
  ];
}
