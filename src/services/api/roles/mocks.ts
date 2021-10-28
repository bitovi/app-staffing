import type { Role } from "./interfaces";

import QueryLogic from "can-query-logic";

import { roles } from "./fixtures";
import { createStore, DateString, requestCreator } from "../baseMocks";

const queryLogic = new QueryLogic<Role>({
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

const { store, ...storeManager } = createStore(roles, queryLogic, "roles");

export default Object.values(requestCreator<Role>("/roles", store));

export const rolesStoreManager = {
  ...storeManager,
};
