import type { JSONRole } from "./fixtures";

import QueryLogic from "can-query-logic";
import { createStoreManager, requestCreator, DateString } from "../baseMocks";

import { roles } from "./fixtures";

const queryLogic = new QueryLogic<JSONRole>({
  identity: ["id"],
  keys: {
    id: "string",
    skill: {
      keys: {
        id: "string",
        name: "string",
      },
    },
    startDate: {
      keys: {
        date: DateString,
        confidence: "string",
      },
    },
    endDate: {
      keys: {
        date: DateString,
        confidence: "string",
      },
    },
    // employees @TODO: there is a pr in can-query-logic for handling complex lists
  },
});

const storeManager = createStoreManager("roles", roles, queryLogic);

export const roleMocks = Object.values(
  requestCreator("/roles", storeManager.store, []),
);

export default storeManager;
