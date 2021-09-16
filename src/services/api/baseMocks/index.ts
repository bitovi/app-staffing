import type { MockResponse, QueriableList } from "../shared";

import { rest } from "msw";

// Needs
// localstorage foreach item
// path
// Entity type

// Creates
// create indiv
// get list
// get individual
// update individual
// delete indivual


export function requestCreator<Resource extends { id: string }>(
  resourcePath: string,
  collection: Resource[],
  queryLogic: any,
) {
  const basePath = "/api/v1";

  return [
    rest.get<undefined, MockResponse<Resource>, { id: string }>(
      `${basePath}${resourcePath}/:id`,
      (req, res, ctx) => {
        const id = req.params.id;
        const item = collection.find((item) => item.id === id);

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
      (req, res, ctx) => {
        const id = req.params.id;
        const index = collection.findIndex((item) => item.id === id);

        if (index < 0) {
          return res(
            ctx.status(404),
            ctx.json({
              error: `Resource ${id} not found.`,
            }),
          );
        }

        const item = collection[index];
        collection[index] = { ...item, ...req.body, id };

        return res(
          ctx.status(201),
          ctx.json({
            data: item,
          }),
        );
      },
    ),
    rest.delete<undefined, MockResponse, { id: string }>(
      `${basePath}${resourcePath}/:id`,
      (req, res, ctx) => {
        const id = req.params.id;
        const index = collection.findIndex((item) => item.id === id);

        if (index < 0) {
          return res(
            ctx.status(404),
            ctx.json({
              error: `Project ${id} not found.`,
            }),
          );
        }

        collection.splice(index, 1);

        return res(ctx.status(200), ctx.json({}));
      },
    ),
    rest.post<Omit<Resource, "id">, MockResponse<Resource>>(
      `${basePath}${resourcePath}`,
      (req, res, ctx) => {
        const id = (Math.floor(Math.random() * 1000) + 1).toString();
        const item = { ...req.body, id } as Resource; // @TODO: look into typing issue

        collection.push(item);
        return res(ctx.status(201), ctx.json({ data: item }));
      },
    ),

    rest.get<
      undefined,
      MockResponse<Resource[], { total: number }>,
      QueriableList<Resource>
    >(`${basePath}${resourcePath}`, (req, res, ctx) => {
      const { filter, sort, page = 1, count = 25 } = req.params;

      const { data, count: total } = queryLogic.filterMembersAndGetCount(
        {
          filter,
          sort,
          page: {
            start: (page - 1) * count,
            end: page * count - 1,
          },
        },
        {},
        collection,
      );

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
