import { rest } from "msw";
// import type { Employee } from ".";

import { employees } from "./fixtures";

export default [
  rest.get("/v1", (req, res, ctx) => {
    // const id = req.url.searchParams.get("id");

    return res(
      ctx.status(200),
      ctx.json({
        data: employees,
      }),
    );
  }),
  rest.post("/v1", (req, res, ctx) => {
    employees.push(JSON.parse(req.body as string));

    return res(ctx.status(202));
  }),
];
