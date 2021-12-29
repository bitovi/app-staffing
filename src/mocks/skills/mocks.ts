import QueryLogic from "can-query-logic";

import { Skill } from "../../services/api";
import { skills } from "./fixtures";
import { createStore } from "../baseMocks";
import requestCreatorSkills from "./request";

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

export default [requestCreatorSkills("/skills", store).getAll];

export const skillStoreManager = {
  store,
  ...storeManager,
};
