import type { NewEmployee, Employee } from "./interfaces";

import { rest } from "msw";

import { employees } from "./fixtures";

export default [
  rest.get("/v1", (req, res, ctx) => {
    const sort = req.url.searchParams.get("sort");

    return res(
      ctx.status(200),
      ctx.json({
        data: employees.sort((lhs, rhs) =>
          sort === "desc"
            ? rhs.name.localeCompare(lhs.name)
            : lhs.name.localeCompare(rhs.name),
        ),
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
      return res(ctx.status(200), ctx.json({ data: employee }));
    }

    return res(
      ctx.status(404),
      ctx.json({ data: "Could not find employee with id " + employee.id }),
    );
  }),
];
