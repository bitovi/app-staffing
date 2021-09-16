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
    roles: "string",
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

export const projectStoreManager = { loadProjects, clearProjects };
