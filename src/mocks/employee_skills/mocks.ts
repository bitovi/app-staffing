import QueryLogic from "can-query-logic";

import { EmployeeSkillTable } from "../../services/api/Skills/Skills";
import { employeesSkills } from "./fixtures";
import { createStore, requestCreator } from "../baseMocks";

const queryLogic = new QueryLogic<EmployeeSkillTable>({
  identity: ["id"],
  keys: {
    id: "string",
    skill_id: "string",
    employee_id: "string",
  },
});

const { store, ...storeManager } = createStore(
  employeesSkills,
  queryLogic,
  "employeesSkills",
);

export default Object.values(requestCreator("/employeesSkills", store));

export const employeeSkillsStoreManager = {
  store,
  ...storeManager,
};
