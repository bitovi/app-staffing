import type { JSONEmployee } from "./fixtures";

import QueryLogic from "can-query-logic";
import { createStoreManager, requestCreator, DateString } from "../baseMocks";

import { employees } from "./fixtures";

const queryLogic = new QueryLogic<JSONEmployee>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
    start_date: DateString,
    end_date: DateString,
  },
});

const storeManager = createStoreManager("employees", employees, queryLogic);

export const employeeMocks = Object.values(
  requestCreator("/employees", storeManager.store, []),
);

export default storeManager;
