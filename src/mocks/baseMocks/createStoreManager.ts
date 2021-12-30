import localStore, { CanLocalStore } from "can-local-store";
import QueryLogic from "can-query-logic";

// Creates a CanLocalStore and returns some helper functions to intialize and clear out the data
export default function createStoreManager<Resource>(
  name: string,
  fixtures: Resource[],
  queryLogic: QueryLogic<Resource>,
): {
  store: CanLocalStore<Resource>;
  load: () => Promise<void>;
  clear: () => Promise<void>;
  isLoaded: () => Promise<boolean>;
} {
  const store = localStore<Resource>({ name, queryLogic });

  return {
    store,
    load: async () => {
      // only load fixtures if they don't already exist
      try {
        // try to get the current data
        await store.getListData();
      } catch (e) {
        // if it fails, load the fixtures
        await store.updateListData(fixtures);
      }
    },
    clear: async () => {
      await store.clear();
    },
    isLoaded: async () =>
      store
        .getListData()
        .then(({ data }) => data.length > 0)
        .catch(() => false),
  };
}
