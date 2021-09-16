import type { NewProject, Project } from "./interfaces";
import type { MockResponse, QueriableList } from "../shared";

import { rest } from "msw";
import QueryLogic from "can-query-logic";

import { projects } from "./fixtures";

const queryLogic = new QueryLogic<Project>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
    description: "string",
    roles: "string",
  },
});

export default [
  rest.get<undefined, MockResponse<Project>, { id: string }>(
    "/api/v1/projects/:id",
    (req, res, ctx) => {
      const id = req.params.id;
      const project = projects.find((project) => project.id === id);

      if (!project) {
        return res(
          ctx.status(404),
          ctx.json({
            error: `Project ${id} not found.`,
          }),
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          data: project,
        }),
      );
    },
  ),

  rest.put<Partial<Project>, MockResponse<Project>, { id: string }>(
    "/api/v1/projects/:id",
    (req, res, ctx) => {
      const id = req.params.id;
      const index = projects.findIndex((project) => project.id === id);

      if (index < 0) {
        return res(
          ctx.status(404),
          ctx.json({
            error: `Project ${id} not found.`,
          }),
        );
      }

      const project = projects[index];
      projects[index] = { ...project, ...req.body, id };

      return res(
        ctx.status(201),
        ctx.json({
          data: project,
        }),
      );
    },
  ),
  rest.delete<undefined, MockResponse, { id: string }>(
    "/api/v1/projects/:id",
    (req, res, ctx) => {
      const id = req.params.id;
      const index = projects.findIndex((project) => project.id === id);

      if (index < 0) {
        return res(
          ctx.status(404),
          ctx.json({
            error: `Project ${id} not found.`,
          }),
        );
      }

      projects.splice(index, 1);

      return res(ctx.status(200), ctx.json({}));
    },
  ),
  rest.post<NewProject, MockResponse<Project>>(
    "/api/v1/projects",
    (req, res, ctx) => {
      const id = (Math.floor(Math.random() * 1000) + 1).toString();
      const project = { ...req.body, id };

      projects.push(project);
      return res(ctx.status(201), ctx.json({ data: project }));
    },
  ),

  rest.get<
    undefined,
    MockResponse<Project[], { total: number }>,
    QueriableList<Project>
  >("/api/v1/projects", (req, res, ctx) => {
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
      projects,
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
