import param from "can-param";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import type { APIResponse, QueriableList } from "../shared";
import { fetcher } from "../shared";
import { SerializerTypes } from "./getJsonApiSerializer";
import hydrateObject from "./hydrateObject";
import deserializeDateMiddleware from "./middlewares/deserializeDateMiddleware";
import jsonApiMiddleware from "./middlewares/jsonApiMiddleware";

interface RestActions<K> {
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
  handleDelete: (collectionItemId: string) => Promise<void>;
}

function useRestList<T, K>(
  path: string,
  type: SerializerTypes,
  queryParams?: QueriableList<K>,
): APIResponse<T[]> {
  const { data: response, error } = useSWR<{ data: T[] }, Error>(
    path,
    (path) => fetcher("GET", type, `${path}?${param(queryParams)}`),
    {
      suspense: true,
      use: [deserializeDateMiddleware],
    },
  );
  return {
    data: response?.data,
    error,
    isLoading: !response && !error,
  };
}

function useRestOne<T>(
  path: string,
  type: SerializerTypes,
  id: string,
): APIResponse<T> {
  const key = `${path}/${id}`;
  const { data: response, error } = useSWR<{ data: T }, Error>(
    key,
    (key) => fetcher("GET", type, key),
    {
      suspense: true,
      use: [deserializeDateMiddleware],
    },
  );
  return {
    data: response?.data,
    error,
    isLoading: !response && !error,
  };
}

function useRestActions<T extends { id?: string }, K>(
  path: string,
  type: SerializerTypes,
): RestActions<K> {
  const { mutate } = useSWRConfig();
  const handleAdd = useCallback<
    (newCollectionItem: { data: Omit<K, "id"> }) => Promise<string | undefined>
  >(
    async (newCollectionItem: { data: Omit<K, "id"> }) => {
      let newId = "";
      try {
        let { data: newItem } = await fetcher(
          "POST",
          type,
          path,
          newCollectionItem,
        );

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

        // mutate list data
        await mutate(
          path,
          async (addResponse: { data: T[] }) => {
            newId = newItem.id;

            return {
              ...addResponse,
              data: [...addResponse.data, newItem],
            };
          },
          false,
        );

        // mutate individual resource cache key
        await mutate(
          `${path}/${newItem.id}`,
          async (updateCollectionItem: { data: T }) => {
            return {
              data: { ...updateCollectionItem, ...newItem },
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
    [path, mutate, type],
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

      // mutate list data
      await mutate(
        path,
        async (cachedData: { data: T[] }) => {
          return {
            ...cachedData,
            data: (cachedData?.data ?? []).map((item) =>
              item?.id === updatedItem.id ? updatedItem : item,
            ),
          };
        },
        false,
      );

      // mutate individual resource cache key
      await mutate(
        `${path}/${id}`,
        async (updateCollectionItem: { data: T }) => {
          return {
            data: { ...updateCollectionItem, ...updatedItem },
          };
        },
        false,
      );
    },
    [path, mutate, type],
  );

  const handleDelete = useCallback(
    async (collectionItemId: string) => {
      await fetcher("DELETE", type, `${path}/${collectionItemId}`);

      // mutate list data
      await mutate(
        path,
        async (deleteResponse: { data: T[] }) => {
          return {
            ...deleteResponse,
            data: deleteResponse.data.filter(
              (item) => item.id !== collectionItemId,
            ),
          };
        },
        false,
      );

      // mutate individual resource cache key
      await mutate(
        `${path}/${collectionItemId}`,
        async (_deleteResponse: { data: T }) => {
          return {
            data: {},
          };
        },
        false,
      );
    },
    [path, mutate, type],
  );
  return {
    handleAdd,
    handleUpdate,
    handleDelete,
  };
}

export default () => {
  return { useRestList, useRestOne, useRestActions };
};
