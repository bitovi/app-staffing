import { rest } from "msw";
import type { Employee } from ".";

import { employees } from "./fixtures";

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
    const employee: Employee = JSON.parse(req.body as string);
    employee.id=(Math.floor(Math.random() * 10000) + 1).toString();
    employees.push(employee);

    return res(ctx.status(201), ctx.json({ data: employee.id }));
  }),

  rest.put("/v1", (req, res, ctx) => {
    const employee = JSON.parse(req.body as string);
    const index = employees.findIndex((x) => x.id === employee.id);
    if (index > -1) employees[index] = employee;

    return res(ctx.status(202));
  }),
];
