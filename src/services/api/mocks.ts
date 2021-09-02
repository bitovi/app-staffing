import type { NewEmployee, NewProject, Employee } from ".";

import { rest } from "msw";

import { employees, projects } from "./fixtures";

export default [
  rest.get("/v1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: employees,
      }),
    );
  }),

  rest.post("/v1", (req, res, ctx) => {
    const employee: NewEmployee = JSON.parse(req.body as string);
    const id = (Math.floor(Math.random() * 1000) + 1).toString();
    employees.push({ ...employee, id });

    return res(ctx.status(201), ctx.json({ data: id }));
  }),

  rest.put("/v1", (req, res, ctx) => {
    const employee: Employee = JSON.parse(req.body as string);
    const index = employees.findIndex((x) => x.id === employee.id);

    if (index > -1) {
      employees[index] = employee;
      return res(ctx.status(202));
    }

    return res(
      ctx.status(404),
      ctx.json({ data: "Could not find employee with id " + employee.id }),
    );
  }),

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
];
