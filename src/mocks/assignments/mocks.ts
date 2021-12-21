import type { JSONAssignment } from "./fixtures";

import QueryLogic from "can-query-logic";

import { assignments } from "./fixtures";
import { createStore, requestCreator } from "../baseMocks";

const queryLogic = new QueryLogic<JSONAssignment>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
    description: "string",
    roles: {
      type: "list",
      values: {
        keys: {
          id: "string",
        },
      },
    },
  },
});

const { store, ...storeManager } = createStore(
  assignments,
  queryLogic,
  "assignments",
);

export default Object.values(requestCreator("/assignments", store));

export const projectStoreManager = {
  ...storeManager,
};
