import QueryLogic from "can-query-logic";

import type { RoleSkillTable } from "./interfaces";
import { rolesSkills } from "./fixtures";
import { createStore, requestCreator } from "../baseMocks";

const queryLogic = new QueryLogic<RoleSkillTable>({
  identity: ["id"],
  keys: {
    id: "string",
    skill_id: "string",
    role_id: "string",
  },
});

const { store, ...storeManager } = createStore(
  rolesSkills,
  queryLogic,
  "rolesSkills",
);

export default Object.values(requestCreator("/rolesSkills", store));

export const rolesSkillsStoreManager = {
  store,
  ...storeManager,
};
