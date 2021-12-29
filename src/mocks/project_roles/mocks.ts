import QueryLogic from "can-query-logic";
import { ProjectRoleTable } from "../../services/api/Roles/Roles";
import { projectRoles } from "./fixtures";
import { createStore, requestCreator } from "../baseMocks";

const queryLogic = new QueryLogic<ProjectRoleTable>({
  identity: ["id"],
  keys: {
    id: "string",
    role_id: "string",
    skill_id: "string",
  },
});

const { store, ...storeManager } = createStore(
  projectRoles,
  queryLogic,
  "projectRoles",
);

export default Object.values(requestCreator("/projectRoles", store));

export const projectRolesStoreManager = {
  store,
  ...storeManager,
};
