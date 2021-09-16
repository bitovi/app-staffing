import type { NewEmployee, Employee } from "./interfaces";
import type { MockResponse, QueriableList } from "../shared";

import { rest } from "msw";
import QueryLogic from "can-query-logic";

import { employees } from "./fixtures";
import { DateString } from "../shared";
import { requestCreator } from "../baseMocks";

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

export default [...requestCreator("/employees", employees, queryLogic)];
