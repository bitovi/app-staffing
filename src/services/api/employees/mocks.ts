import QueryLogic from "can-query-logic";
import requestCreatorEmployee from "./request";
import { createStore, DateString } from "../baseMocks";

import type { EmployeeTable } from "./interfaces";
import { employees } from "./fixtures";

const queryLogic = new QueryLogic<EmployeeTable>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
    startDate: DateString,
    endDate: DateString,
  },
});

const { store, ...storeManager } = createStore(
  employees,
  queryLogic,
  "employees",
);

export default Object.values(requestCreatorEmployee("/employees", store));

export const employeeStoreManager = {
  store,
  ...storeManager,
};
