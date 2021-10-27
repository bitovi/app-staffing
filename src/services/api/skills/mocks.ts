import QueryLogic from "can-query-logic";

import type { Skill } from ".";
import { skills } from "./fixtures";
import { createStore, requestCreator } from "../baseMocks";

const queryLogic = new QueryLogic<Skill>({
  identifier: ["id"],
  keys: {
    id: "string",
    name: "string",
  },
});

const { store, ...storeManager } = createStore(skills, queryLogic, "skills");

export default requestCreator("/skills", store);

export const skillStoreManager = {
  ...storeManager,
};
