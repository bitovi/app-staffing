import param from "can-param";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import type { APIResponse, QueriableList } from "../shared";
import { fetcher } from "../shared";
import { SerializerTypes } from "./getJsonApiSerializer";
import hydrateObject from "./hydrateObject";
import deserializeDateMiddleware from "./middlewares/deserializeDateMiddleware";
import jsonApiMiddleware from "./middlewares/jsonApiMiddleware";

interface RestActions<T> {
  handleAdd: (newCollectionItem: {
    data: Omit<T, "id">;
  }) => Promise<string | undefined>;
  handleUpdate: (id: string, data: { data: Omit<T, "id"> }) => Promise<void>;
  handleDelete: (collectionItemId: string) => Promise<void>;
}

interface restBuilderActions<T, K> {
  useRestOne: (id: string) => APIResponse<T>;
  useRestList: () => APIResponse<T[]>;
  useRestActions: () => RestActions<K>;
}

export default function restBuilder<
  FrontEndShape extends { id?: string },
  JSONShape,
>(
  path: string,
  type: SerializerTypes,
): restBuilderActions<FrontEndShape, JSONShape> {
  function useRestList(
    queryParams?: QueriableList<JSONShape>,
  ): APIResponse<FrontEndShape[]> {
    const { data: response, error } = useSWR<{ data: FrontEndShape[] }, Error>(
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
    };
  }

  function useRestOne(id: string): APIResponse<FrontEndShape> {
    const key = `${path}/${id}`;
    const { data: response, error } = useSWR<{ data: FrontEndShape }, Error>(
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
    };
  }

  function useRestActions(): RestActions<JSONShape> {
    const { mutate } = useSWRConfig();
    const handleAdd = useCallback<
      (newCollectionItem: {
        data: Omit<JSONShape, "id">;
      }) => Promise<string | undefined>
    >(
      async (newCollectionItem: { data: Omit<JSONShape, "id"> }) => {
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
              const hydratedDeserialized = await hydrateObject<{
                data: FrontEndShape;
              }>(deserializedItem, relationships);
              newItem = hydratedDeserialized.data;
            }
          }
          // -----------------------------------------------

          // mutate list data
          await mutate(
            path,
            async (addResponse: { data: FrontEndShape[] }) => {
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
            async (updateCollectionItem: { data: FrontEndShape }) => {
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
      [mutate],
    );
    const handleUpdate = useCallback<
      (id: string, data: { data: Omit<JSONShape, "id"> }) => Promise<void>
    >(
      async (id: string, data: { data: Omit<JSONShape, "id"> }) => {
        let { data: updatedItem } = await fetcher<{ data: FrontEndShape }>(
          "PATCH",
          type,
          `${path}/${id}`,
          data,
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
            const hydratedDeserialized = await hydrateObject<{
              data: FrontEndShape;
            }>(deserializedItem, relationships);
            updatedItem = hydratedDeserialized.data;
          }
        }
        // -----------------------------------------------

        // mutate list data
        await mutate(
          path,
          async (cachedData: { data: FrontEndShape[] }) => {
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
          async (updateCollectionItem: { data: FrontEndShape }) => {
            return {
              data: { ...updateCollectionItem, ...updatedItem },
            };
          },
          false,
        );
      },
      [mutate],
    );

    const handleDelete = useCallback(
      async (collectionItemId: string) => {
        await fetcher("DELETE", type, `${path}/${collectionItemId}`);

        // mutate list data
        await mutate(
          path,
          async (deleteResponse: { data: FrontEndShape[] }) => {
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
          async (_deleteResponse: { data: FrontEndShape }) => {
            return {
              data: {},
            };
          },
          false,
        );
      },
      [mutate],
    );
    return {
      handleAdd,
      handleUpdate,
      handleDelete,
    };
  }
  return { useRestOne, useRestList, useRestActions };
}
