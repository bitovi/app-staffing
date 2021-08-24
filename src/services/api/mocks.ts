import { rest } from "msw";

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
];
