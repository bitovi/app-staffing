import param from "can-param";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import isEmpty from "lodash/isEmpty";
import type { APIResponse, QueriableList } from "../shared";
import { fetcher } from "../shared";
import { SerializerTypes } from "./getJsonApiSerializer";
import hydrateObject from "./hydrateObject";
import deserializeDateMiddleware from "./middlewares/deserializeDateMiddleware";
import jsonApiMiddleware from "./middlewares/jsonApiMiddleware";
interface RestActions<T, K> extends APIResponse<T[]> {
  handleAdd: (newCollectionItem: {
    data: Omit<K, "id">;
  }) => Promise<string | undefined>;
  handleUpdate: ({
    data,
    id,
  }: {
    data: Omit<K, "id">;
    id?: string;
  }) => Promise<void>;
  reset: () => void;
  handleDelete: (collectionItemId: string) => Promise<void>;
}

/**
 * @typeParam T - Frontend data shape
 * @typeParam K - Backend (JSON API) data shape
 * @param path - The endpoint path
 * @param type
 * @param queryParams
 */
function useRest<T extends { id?: string }, K>(
  path: string,
  type: SerializerTypes,
  queryParams?: QueriableList<K>,
): RestActions<T, K> {
  const key = isEmpty(queryParams) ? path : `${path}?${param(queryParams)}`;
  const { mutate } = useSWRConfig();
  const { data: response, error } = useSWR<{ data: T[] }, Error>(
    key,
    (url) => fetcher("GET", type, url),
    {
      suspense: true,
      use: [deserializeDateMiddleware],
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
            let { data: newItem } = await fetcher(
              "POST",
              type,
              path,
              newCollectionItem,
            );
            newId = newItem.id;

            //----------------------------------------------
            // a temporary measure until all endpoints are in JSON API format
            // otherwise the deserializer will flatten out object and erase information
            if (type !== "undefined") {
              const [deserializedItem, relationships] = jsonApiMiddleware(
                { data: newItem },
                type,
              );
              newItem = deserializedItem.data;

              // if the return object had relationship fields, they need to be hydrated
              // otherwise they are in the format [ {type: string, id: string} ]
              if (relationships.length > 0) {
                const hydratedDeserialized = await hydrateObject<{ data: T }>(
                  deserializedItem,
                  relationships,
                );
                newItem = hydratedDeserialized.data;
              }
            }
            // -----------------------------------------------

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
  const handleUpdate = useCallback<
    ({ data, id }: { data: Omit<K, "id">; id?: string }) => Promise<void>
  >(
    async ({
      data: updatedCollectionItem,
      id,
    }: {
      data: Omit<K, "id">;
      id?: string;
    }) => {
      await mutate(
        key,
        async (cachedData: { data: T[] }) => {
          let { data: updatedItem } = await fetcher<{ data: T }>(
            "PATCH",
            type,
            `${path}/${id}`,
            updatedCollectionItem,
          );
          //----------------------------------------------
          // a temporary measure until all endpoints are in JSON API format
          // otherwise the deserializer will flatten out object and erase information
          if (type !== "undefined") {
            const [deserializedItem, relationships] = jsonApiMiddleware(
              { data: updatedItem },
              type,
            );
            updatedItem = deserializedItem.data;

            // if the return object had relationship fields, they need to be hydrated
            // otherwise they are in the format [ {type: string, id: string} ]
            if (relationships.length > 0) {
              const hydratedDeserialized = await hydrateObject<{ data: T }>(
                deserializedItem,
                relationships,
              );
              updatedItem = hydratedDeserialized.data;
            }
          }
          // -----------------------------------------------
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
    handleAdd,
    handleUpdate,
    handleDelete,
    error,
    isLoading: !response && !error,
    reset: () => mutate(key, (v: T) => v, false),
  };
}
export default useRest;
