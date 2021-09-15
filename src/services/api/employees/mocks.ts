import type { NewEmployee, Employee } from "./interfaces";

import { rest } from "msw";
import QueryLogic, { Filter } from "can-query-logic";

import { employees } from "./fixtures";

type ApiResponse<D = undefined, M = undefined> = {
  data?: D;
  metadata?: M;
  error?: string;
};

type QueriableList<T> = {
  filter: Filter<T>;
  sort: string;
  page?: number;
  count?: number;
};

const queryLogic = new QueryLogic<Employee>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
    startDate: "string",
    endDate: "string",
    skills: "string",
  },
});

export default [
  rest.get<
    undefined,
    ApiResponse<Employee[], { total: number }>,
    QueriableList<Employee>
  >("/v1", (req, res, ctx) => {
    const { filter, sort, page = 1, count = 25 } = req.params;

    const { data, count: total } = queryLogic.filterMembersAndGetCount(
      {
        filter,
        sort,
        page: {
          start: (page - 1) * count,
          end: page * count - 1,
        },
      },
      {},
      employees,
    );

    return res(
      ctx.status(200),
      ctx.json({
        data,
        metadata: {
          total,
          pages: Math.ceil(total / count),
        },
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
