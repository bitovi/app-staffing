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
      //**************************************************************************** */
      //commenting out during dev on branch to more easily test mock server responses
      // try {
      //   await store.getListData();
      // } catch (_) {
      await store.updateListData(collection); //if the data isn't loaded, promise rejects and we use fixture data
      // }
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
