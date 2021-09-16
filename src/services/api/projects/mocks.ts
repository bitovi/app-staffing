import type { NewProject, Project } from "./interfaces";
import type { MockResponse, QueriableList } from "../shared";

import { rest } from "msw";
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
store.updateListData(projects);

export default [...requestCreator("/projects", projects, queryLogic)];
