import param from "can-param";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import type { APIResponse, QueriableList } from "../shared";
import { fetcher } from "../shared";
import { SerializerTypes } from "../getJsonApiSerializer";
import deserializeDateMiddleware from "../parseDate";
interface RestActions<T> extends APIResponse<T[]> {
  handleAdd: (newCollectionItem: Omit<T, "id">) => Promise<string>;
  handleUpdate: (
    collectionItemId: string,
    updatedCollectionItem: Partial<T>,
  ) => Promise<void>;
  handleDelete: (collectionItemId: string) => Promise<void>;
  reset: () => void;
}
function useRest<T extends { id: string }>(
  path: string,
  type: SerializerTypes,
  queryParams?: QueriableList<T>,
): RestActions<T> {
  const key = `${path}?${param(queryParams)}`;
  const { mutate } = useSWRConfig();
  const { data: response, error } = useSWR<{ data: T[] }, Error>(
    key,
    (url) => fetcher("GET", type, url),
    { suspense: true, use: [deserializeDateMiddleware] },
  );
  const handleAdd = useCallback<
    (newCollectionItem: Omit<T, "id">) => Promise<string>
  >(
    async (newCollectionItem: Omit<T, "id">) => {
      let newId = "";
      await mutate(
        key,
        async (addResponse: { data: T[] }) => {
          const { data: newItem } = await fetcher<{ data: T }>(
            "POST",
            type,
            path,
            newCollectionItem,
          );
          newId = newItem.id;
          return {
            ...addResponse,
            data: [...addResponse.data, { ...newCollectionItem, id: newId }],
          };
        },
        false,
      );
      return newId;
    },
    [path, key, mutate, type],
  );
  const handleUpdate = useCallback<
    (
      collectionItemId: string,
      updatedCollectionItem: Partial<T>,
    ) => Promise<void>
  >(
    async (collectionItemId: string, updatedCollectionItem: Partial<T>) => {
      await mutate(
        key,
        async (cachedData: { data: T[] }) => {
          const { data: updatedItem } = await fetcher<{ data: T }>(
            "PUT",
            type,
            `${path}/${collectionItemId}`,
            updatedCollectionItem,
          );
          return {
            ...cachedData,
            data: (cachedData?.data ?? []).map((item) =>
              item.id === updatedItem.id ? updatedItem : item,
            ),
          };
        },
        false,
      );
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
    error,
    isLoading: !response && !error,
    handleAdd,
    handleUpdate,
    handleDelete,
    reset: () => mutate(key, (v: T) => v, false),
  };
}
export default useRest;
