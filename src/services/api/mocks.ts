import { rest } from "msw";

export default [
  rest.get("/v1", (req, res, ctx) => {
    const foo = req.url.searchParams.get("foo");

    return res(
      ctx.status(200),
      ctx.json({
        data: [
          foo !== "undefined" && { id: 0, name: foo },
          { id: 1, name: "bar" },
          { id: 2, name: "bam" },
          { id: 3, name: "baz" },
        ].filter((v) => v),
      }),
    );
  }),
];
