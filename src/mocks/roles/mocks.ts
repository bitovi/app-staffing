import QueryLogic from "can-query-logic";

import { Role } from "../../services/api";
import { roles } from "./fixtures";
import { createStore, DateString } from "../baseMocks";
import requestCreatorRole from "./request";

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

export default Object.values(requestCreatorRole("/roles", store));

export const rolesStoreManager = {
  store,
  ...storeManager,
};
