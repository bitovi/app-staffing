import type { NewEmployee, Employee } from "./interfaces";
import type { MockResponse, QueriableList } from "../shared";

import { rest } from "msw";
import QueryLogic from "can-query-logic";

import { employees } from "./fixtures";
import { DateString } from "../shared";

const queryLogic = new QueryLogic<Employee>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
    startDate: DateString,
    endDate: DateString,
    skills: "string",
  },
});

export default [
  rest.get<undefined, MockResponse<Employee>, { id: string }>(
    "/api/v1/employees/:id",
    (req, res, ctx) => {
      const id = req.params.id;
      const employee = employees.find((employee) => employee.id === id);

      if (!employee) {
        return res(
          ctx.status(404),
          ctx.json({
            error: `Employee ${id} not found.`,
          }),
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          data: employee,
        }),
      );
    },
  ),

  rest.put<Partial<Employee>, MockResponse<Employee>, { id: string }>(
    "/api/v1/employees/:id",
    (req, res, ctx) => {
      const id = req.params.id;
      const index = employees.findIndex((employee) => employee.id === id);

      if (index < 0) {
        return res(
          ctx.status(404),
          ctx.json({
            error: `Employee ${id} not found.`,
          }),
        );
      }

      const employee = employees[index];
      employees[index] = { ...employee, ...req.body, id };

      return res(
        ctx.status(201),
        ctx.json({
          data: employee,
        }),
      );
    },
  ),

  rest.delete<undefined, MockResponse, { id: string }>(
    "/api/v1/employees/:id",
    (req, res, ctx) => {
      const id = req.params.id;
      const index = employees.findIndex((employee) => employee.id === id);

      if (index < 0) {
        return res(
          ctx.status(404),
          ctx.json({
            error: `Employee ${id} not found.`,
          }),
        );
      }

      employees.splice(index, 1);

      return res(ctx.status(200), ctx.json({}));
    },
  ),

  rest.post<NewEmployee, MockResponse<Employee>>(
    "/api/v1/employees",
    (req, res, ctx) => {
      const id = (Math.floor(Math.random() * 1000) + 1).toString();
      const employee = { ...req.body, id };

      employees.push(employee);
      return res(ctx.status(201), ctx.json({ data: employee }));
    },
  ),

  rest.get<
    undefined,
    MockResponse<Employee[], { total: number }>,
    QueriableList<Employee>
  >("/api/v1/employees", (req, res, ctx) => {
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
];
