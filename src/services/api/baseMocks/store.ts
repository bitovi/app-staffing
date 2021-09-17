import localStore, { CanLocalStore } from "can-local-store";
import QueryLogic from "can-query-logic";

// Creates a CanLocalStore and returns some helper functions to intialize and clear out the data
export default function createStore<Resource>(
  collection: Resource[],
  queryLogic: QueryLogic<Resource>,
  name: string,
): {
  store: CanLocalStore<Resource>;
  loadResources: () => Promise<void>;
  clearResources: () => Promise<void>;
  dataIsLoaded: () => Promise<boolean>;
} {
  const store = localStore<Resource>({ queryLogic, name });

  return {
    store,
    loadResources: async () => {
      await store.updateListData(collection);
    },
    clearResources: async () => {
      await store.clear();
    },
    dataIsLoaded: async () =>
      store.getListData().then(({ data }) => data.length > 0),
  };
}
