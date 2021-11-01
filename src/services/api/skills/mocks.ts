import QueryLogic from "can-query-logic";

import type { Skill } from ".";
import { skills } from "./fixtures";
import { createStore, requestCreator } from "../baseMocks";

const queryLogic = new QueryLogic<Skill>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
  },
});

const { store, ...storeManager } = createStore<Skill>(
  skills,
  queryLogic,
  "skills",
);

export default [requestCreator("/skills", store).getAll];

export const skillStoreManager = {
  store,
  ...storeManager,
};
