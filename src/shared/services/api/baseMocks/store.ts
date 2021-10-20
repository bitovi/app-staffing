import localStore, { CanLocalStore } from "can-local-store";
import QueryLogic from "can-query-logic";

// Creates a CanLocalStore and returns some helper functions to intialize and clear out the data
export default function createStore<Resource>(
  collection: Resource[],
  queryLogic: QueryLogic<Resource>,
  name: string,
): {
  ready: () => Promise<boolean>;
  clear: () => Promise<void>;
  load: () => Promise<boolean>;
  store: CanLocalStore<Resource>;
} {
  const store = localStore<Resource>({ queryLogic, name });

  async function ready() {
    return store
      .getListData()
      .then(({ data }) => data.length > 0)
      .catch((_) => false); // If the data isn't loaded the promise is rejected
  }

  async function clear() {
    await store.clear();
  }

  async function load(force: boolean = false) {
    if (force || !(await ready())) {
      await store.updateListData(collection);
      return true;
    }

    return false;
  }

  return {
    ready,
    clear,
    load,
    store,
  };
}
