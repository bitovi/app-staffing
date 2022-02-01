import type { JSONAssignment } from "./fixtures";

import QueryLogic from "can-query-logic";
import { createStoreManager, requestCreator } from "../baseMocks";

import { assignments } from "./fixtures";

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

const storeManager = createStoreManager("assignments", assignments, queryLogic);

export const assignmentMocks = Object.values(
  requestCreator("/assignments", storeManager.store, []),
);

export default storeManager;
