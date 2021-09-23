import type { APIResponse, QueriableList } from "../shared";

import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import param from "can-param";

import { fetcher } from "../shared";

interface RestActions<T> extends APIResponse<T[]> {
  useAdd: (newCollectionItem: Omit<T, "id">) => Promise<string>;
  useUpdate: (
    collectionItemId: string,
    updatedCollectionItem: Partial<T>,
  ) => Promise<void>;
  useDelete: (collectionItemId: string) => Promise<void>;
}

function useRest<T extends { id: string }>(
  path: string,
  queryParams?: QueriableList<T>,
): RestActions<T> {
  const { data: response, error } = useSWR<{ data: T[] }, Error>(
    `${path}?${param(queryParams)}`,
    (url) => {
      return fetcher("GET", url);
    },
  );

  const useAdd = useCallback<
    (newCollectionItem: Omit<T, "id">) => Promise<string>
  >(
    async (newCollectionItem: Omit<T, "id">) => {
      let newId = "";
      await mutate(
        `${path}?${param(queryParams)}`,
        async (addResponse: { data: T[] }) => {
          const { data: newItem } = await fetcher<{ data: T }>(
            "POST",
            path,
            newCollectionItem,
          );

          newId = newItem.id;

          return {
            ...addResponse,
            data: [...addResponse.data, newItem],
          };
        },
        false,
      );

      return newId;
    },
    [path, queryParams],
  );

  const useUpdate = useCallback<
    (
      collectionItemId: string,
      updatedCollectionItem: Partial<T>,
    ) => Promise<void>
  >(
    async (collectionItemId: string, updatedCollectionItem: Partial<T>) => {
      await mutate(
        `${path}?${param(queryParams)}`,
        async (updateResponse: { data: T[] }) => {
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
        },
      );
    },
    [path, queryParams],
  );

  const useDelete = useCallback(
    async (collectionItemId: string) => {
      await mutate(
        `${path}?${param(queryParams)}`,
        async (deleteResponse: { data: T[] }) => {
          await fetcher("DELETE", `${path}/${collectionItemId}`);

          return {
            ...deleteResponse,
            data: deleteResponse.data.filter(
              (item) => item.id !== collectionItemId,
            ),
          };
        },
      );
    },
    [path, queryParams],
  );

  return {
    data: response?.data,
    error,
    isLoading: !response && !error,
    useAdd,
    useUpdate,
    useDelete,
  };
}

export default useRest;
