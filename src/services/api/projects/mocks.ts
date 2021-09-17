import type { Project } from "./interfaces";

import QueryLogic from "can-query-logic";

import { projects } from "./fixtures";
import { createStore, requestCreator } from "../baseMocks";

const queryLogic = new QueryLogic<Project>({
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
  projects,
  queryLogic,
  "projects",
);

export default [...requestCreator("/projects", store)];

export const projectStoreManager = {
  ...storeManager,
};
