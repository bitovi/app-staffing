import param from "can-param";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import type { APIResponse, QueriableList } from "../shared";
import { fetcher } from "../shared";
import { skillStoreManager } from "../skills/mocks";
import { SerializerTypes } from "./getJsonApiSerializer";
import deserializeDateMiddleware from "./middlewares/deserializeDateMiddleware";
interface RestActions<T, K> extends APIResponse<T[]> {
  handleAdd: (newCollectionItem: {
    data: Omit<K, "id">;
  }) => Promise<string | undefined>;
  reset: () => void;
  handleDelete: (collectionItemId: string) => Promise<void>;
}

function useRest<T extends { id?: string }, K>(
  path: string,
  type: SerializerTypes,
  queryParams?: QueriableList<K>,
): RestActions<T, K> {
  const key = `${path}?${param(queryParams)}`;
  const { mutate, cache } = useSWRConfig();
  const { data: response, error } = useSWR<{ data: T[] }, Error>(
    key,
    (url) => fetcher("GET", type, url),
    {
      suspense: true,
      use: [deserializeDateMiddleware],
      fallbackData: cache.get(key),
    },
  );
  const handleAdd = useCallback<
    (newCollectionItem: { data: Omit<K, "id"> }) => Promise<string | undefined>
  >(
    async (newCollectionItem: { data: Omit<K, "id"> }) => {
      let newId = "";
      try {
        await mutate(
          key,
          async (addResponse: { data: T[] }) => {
            const { data: newItem } = await fetcher(
              "POST",
              type,
              path,
              newCollectionItem,
            );
            newId = newItem.id;

            // Need to either put this somewhere Employees specific
            // OR make it generic for all endpoints
            const includedSkills = await skillStoreManager.store.getListData({
              filter: {
                id: newItem.skills,
              },
            });
            newItem.skills = includedSkills.data;

            return {
              ...addResponse,
              data: [...addResponse.data, newItem],
            };
          },
          false,
        );
        return newId;
      } catch (error) {
        if (error instanceof Error) {
          //console.log(error.message);
        }
      }
    },
    [path, key, mutate, type],
  );

  const handleDelete = useCallback(
    async (collectionItemId: string) => {
      await mutate(
        key,
        async (deleteResponse: { data: T[] }) => {
          await fetcher("DELETE", type, `${path}/${collectionItemId}`);
          return {
            ...deleteResponse,
            data: deleteResponse.data.filter(
              (item) => item.id !== collectionItemId,
            ),
          };
        },
        false,
      );
    },
    [path, key, mutate, type],
  );
  return {
    data: response?.data,
    handleAdd,
    handleDelete,
    error,
    isLoading: !response && !error,
    reset: () => mutate(key, (v: T) => v, false),
  };
}

export default useRest;
