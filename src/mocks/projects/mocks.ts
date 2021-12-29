import QueryLogic from "can-query-logic";
import requestCreatorProject from "./request";
import { createStore } from "../baseMocks";
import { JSONProject, projects } from "./fixtures";

const queryLogic = new QueryLogic<JSONProject>({
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

export default Object.values(requestCreatorProject("/projects", store));

export const projectStoreManager = {
  store,
  ...storeManager,
};
