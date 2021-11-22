import localStore, { CanLocalStore } from "can-local-store";
import QueryLogic from "can-query-logic";

// Creates a CanLocalStore and returns some helper functions to intialize and clear out the data
export default function createStore<Resource>(
  collection: Resource[],
  queryLogic: QueryLogic<Resource>,
  name: string,
): {
  store: CanLocalStore<Resource>;
  load: () => Promise<void>;
  clear: () => Promise<void>;
  isLoaded: () => Promise<boolean>;
} {
  const store = localStore<Resource>({ queryLogic, name });

  return {
    store,
    load: async () => {
      const preCheck = await store.getListData();
      if (!preCheck) await store.updateListData(collection);
    },
    clear: async () => {
      await store.clear();
    },
    isLoaded: async () =>
      store
        .getListData()
        .then(({ data }) => data.length > 0)
        .catch((_) => false), // If the data isn't loaded the promise is rejected
  };
}
