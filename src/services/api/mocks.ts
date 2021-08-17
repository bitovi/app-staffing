import { rest } from "msw";

export default [
  rest.get("/v1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          { id: 1, name: "bar" },
          { id: 2, name: "bam" },
          { id: 3, name: "baz" },
        ],
      }),
    );
  }),
];
