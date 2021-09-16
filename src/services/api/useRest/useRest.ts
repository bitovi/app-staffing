import type { APIResponse } from "../shared";

import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../shared";

interface RestActions<T> extends APIResponse<T[]> {
  useAdd: (newCollectionItem: Omit<T, "id">) => Promise<string>;
  useUpdate: (
    collectionItemId: string,
    updatedCollectionItem: Partial<T>,
  ) => Promise<void>;
}

function useRest<T extends { id: string }>(path: string): RestActions<T> {
  const { data: response, error } = useSWR<{ data: T[] }, Error>(path, (url) =>
    fetcher("GET", url),
  );

  const useAdd = useCallback<
    (newCollectionItem: Omit<T, "id">) => Promise<string>
  >(
    async (newCollectionItem: Omit<T, "id">) => {
      let newId = "";
      await mutate(path, async (addResponse: { data: T[] }) => {
        const { data: id } = await fetcher<{ data: string }>(
          "POST",
          path,
          newCollectionItem,
        );

        newId = id;

        return {
          ...addResponse,
          data: [...addResponse.data, { ...newCollectionItem, id }],
        };
      });

      return newId;
    },
    [path],
  );

  const useUpdate = useCallback<
    (
      collectionItemId: string,
      updatedCollectionItem: Partial<T>,
    ) => Promise<void>
  >(
    async (collectionItemId: string, updatedCollectionItem: Partial<T>) => {
      await mutate(path, async (updateResponse: { data: T[] }) => {
        const updatedItem = await fetcher<Promise<T>>(
          "PUT",
          `${path}/${collectionItemId}`,
          updatedCollectionItem,
        );

        return {
          ...updateResponse,
          data: updateResponse.data.map((item) =>
            item.id === updatedItem.id ? updatedItem : item,
          ),
        };
      });
    },
    [path],
  );

  return {
    data: response?.data,
    error,
    isLoading: !response && !error,
    useAdd,
    useUpdate,
  };
}

export default useRest;
