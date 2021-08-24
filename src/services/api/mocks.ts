import { rest } from "msw";
import { Employee } from "./api";

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
    // const id = req.url.searchParams.get("id");
    console.log("adding to mocks");
    console.log(req.body);

    employees.push(req.body as Employee)

    return res(
      ctx.status(202)
    );
  }),
];
