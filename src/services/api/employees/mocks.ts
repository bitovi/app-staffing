import type { Employee } from "./interfaces";

import QueryLogic from "can-query-logic";
import localStore from "can-local-store";

import { employees } from "./fixtures";
import { DateString } from "../shared";
import { requestCreator } from "../baseMocks";

const queryLogic = new QueryLogic<Employee>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
    startDate: DateString,
    endDate: DateString,
    // skills: {
    //   type: "list",
    //   values: {
    //     keys: {
    //       id: "string",
    //       name: "string",
    //     },
    //   },
    //   keys: {
    //     count: "number",
    //   },
    // },
  },
});

const store = localStore<Employee>({ queryLogic, name: "employees" });

export default [...requestCreator("/employees", store)];

async function loadEmployees(): Promise<void> {
  await store.updateListData(employees);
}

async function clearEmployees(): Promise<void> {
  await store.clear();
}

async function dataIsLoaded(): Promise<boolean> {
  return store.getListData().then(({ data }) => data.length > 0);
}

export const employeeStoreManager = {
  loadEmployees,
  clearEmployees,
  dataIsLoaded,
};
