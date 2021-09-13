import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import { APIResponse, fetcher } from "../shared";

interface RestActions<T> extends APIResponse<T[]> {
  useAdd: (newCollectionItem: Omit<T, "id">) => Promise<string>;
  useUpdate: (updatedCollectionItem: Partial<T>) => Promise<void>;
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
    (updatedCollectionItem: Partial<T>) => Promise<void>
  >(
    async (updatedCollectionItem: Partial<T>) => {
      await mutate(path, async (updateResponse: { data: T[] }) => {
        await fetcher<Promise<T>>("PUT", path, updatedCollectionItem);

        return {
          ...updateResponse,
          data: updateResponse.data.map((item) =>
            item.id === updatedCollectionItem.id ? updatedCollectionItem : item,
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
