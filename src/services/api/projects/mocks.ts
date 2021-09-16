import type { Project } from "./interfaces";

import QueryLogic from "can-query-logic";
import localStore from "can-local-store";

import { projects } from "./fixtures";
import { requestCreator } from "../baseMocks";

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

const store = localStore<Project>({ queryLogic, name: "projects" });

export default [...requestCreator("/projects", store)];

async function loadProjects(): Promise<void> {
  await store.updateListData(projects);
}

async function clearProjects(): Promise<void> {
  await store.clear();
}

async function dataIsLoaded(): Promise<boolean> {
  return store.getListData().then(({ data }) => data.length > 0);
}

export const projectStoreManager = {
  loadProjects,
  clearProjects,
  dataIsLoaded,
};
