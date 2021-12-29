import { rest } from "msw";
import type { RestHandler, DefaultRequestBody, MockedRequest } from "msw";
import deparam from "can-deparam";
import { CanLocalStore } from "can-local-store";
import { MockResponse, JSONAPI } from "../baseMocks/interfaces";
import { Role } from "../../services/api";
import { JSONRole } from "./fixtures";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function requestCreatorRole<Resource extends Role>(
  resourcePath: string,
  store: CanLocalStore<Resource>,
): { [requestType: string]: RestHandler<MockedRequest<DefaultRequestBody>> } {
  return {
    getOne: rest.get<undefined, MockResponse<Resource>, { id: string }>(
      `${API_BASE_URL}${resourcePath}/:id`,
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
    delete: rest.delete<undefined, MockResponse, { id: string }>(
      `${API_BASE_URL}${resourcePath}/:id`,
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
      `${API_BASE_URL}${resourcePath}`,
      async (req, res, ctx) => {
        const id = (Math.floor(Math.random() * 1000) + 1).toString();
        const item = { ...req.body, id } as unknown as Resource; // @TODO: look into typing issue

        await store.createData(item);

        return res(ctx.status(201), ctx.json({ data: item }));
      },
    ),

    getAll: rest.get<JSONAPI<JSONRole[], void>>(
      `${API_BASE_URL}${resourcePath}`,
      async (req, res, ctx) => {
        const {
          filter,
          sort,
          page = 1,
          count = 25,
        } = deparam(req.url.searchParams.toString());

        const { data: skills } = await store.getListData({
          filter,
          sort,
          page: {
            start: (page - 1) * count,
            end: page * count - 1,
          },
        });

        const jsonAPISkills: JSONRole[] = skills.map(
          (role: Role): JSONRole => ({
            type: "roles",
            id: role.id,
            attributes: {
              start_date: role.start_date,
              start_confidence: role.start_confidence,
              end_date: role.end_date,
              end_confidence: role.end_confidence,
            },
            relationships: {
              assignments: {
                data: [{ type: "assignments", id: "1"}]
              },
              project: {
                data: { type: "projects", id: "2"}
              },
              skills: {
                data: [{ type: "skills", id: "3"}]
              },
            },
          }),
        );
        return res(
          ctx.status(200),
          ctx.json({
            data: jsonAPISkills,
          }),
        );
      },
    ),
  };
}
