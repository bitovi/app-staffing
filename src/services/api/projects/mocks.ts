import type { NewProject, Project } from ".";

import { rest } from "msw";
import { projects } from "./fixtures";

export default [
  rest.get("/v1/projects", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: projects,
      }),
    );
  }),

  rest.post("/v1/projects", (req, res, ctx) => {
    const project: NewProject = JSON.parse(req.body as string);
    const id = (Math.floor(Math.random() * 1000) + 1).toString();
    projects.push({ ...project, id });

    return res(ctx.status(201), ctx.json({ data: id }));
  }),

  rest.put("/v1/projects", (req, res, ctx) => {
    const project: Project = JSON.parse(req.body as string);
    const index = projects.findIndex((x) => x.id === project.id);

    if (index > -1) {
      projects[index] = project;

      return res(ctx.status(200), ctx.json({ data: project }));
    }

    return res(
      ctx.status(404),
      ctx.json({ data: "Could not find project with id " + project.id }),
    );
  }),
];
