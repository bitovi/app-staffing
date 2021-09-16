import type { NewProject, Project } from ".";

import { rest } from "msw";
import { projects } from "./fixtures";

export default [
  rest.get("/api/v1/projects", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: projects,
      }),
    );
  }),

  rest.post("/api/v1/projects", (req, res, ctx) => {
    /** @TODO add typing */
    const project: NewProject = req.body as unknown as Project;
    const id = (Math.floor(Math.random() * 1000) + 1).toString();
    projects.push({ ...project, id });

    return res(ctx.status(201), ctx.json({ data: id }));
  }),

  rest.put("/api/v1/projects/:id", (req, res, ctx) => {
    const project: Project = req.body as unknown as Project;
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
