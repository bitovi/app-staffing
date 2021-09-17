import type { Employee } from "./interfaces";

import QueryLogic from "can-query-logic";

import { employees } from "./fixtures";
import { createStore, requestCreator, DateString } from "../baseMocks";

const queryLogic = new QueryLogic<Employee>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
    startDate: DateString,
    endDate: DateString,
    // skills: {
    //   type: "list",
    //   values: {
    //     keys: {
    //       id: "string",
    //       name: "string",
    //     },
    //   },
    //   keys: {
    //     count: "number",
    //   },
    // },
  },
});

const { store, ...storeManager } = createStore(
  employees,
  queryLogic,
  "employees",
);

export default requestCreator("/employees", store);

export const employeeStoreManager = {
  ...storeManager,
};
