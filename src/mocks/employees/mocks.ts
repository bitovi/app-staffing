import QueryLogic from "can-query-logic";
import requestCreatorEmployee from "./request";
import { createStore, DateString } from "../baseMocks";
import { JSONEmployee, employees } from "./fixtures";

const queryLogic = new QueryLogic<JSONEmployee>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
    start_date: DateString,
    end_date: DateString,
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
