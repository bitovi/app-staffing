import type { JSONSkill } from "./fixtures";

import QueryLogic from "can-query-logic";
import { createStoreManager, requestCreator } from "../baseMocks";

import { skills } from "./fixtures";

const queryLogic = new QueryLogic<JSONSkill>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
  },
});

const relatedStores = [
  {
    source: "employees",
    sourceRelationship: "skills",
    targetRelationship: "employees",
  },
];

const storeManager = createStoreManager("skills", skills, queryLogic);

export const skillMocks = Object.values(
  requestCreator("/skills", storeManager.store, relatedStores),
);

export default storeManager;
