import { useToast } from "@chakra-ui/toast";
import param from "can-param";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import type { APIResponse, QueriableList } from "../shared";
import { fetcher } from "../shared";
import { SerializerTypes } from "./getJsonApiSerializer";
import hydrateObject from "./hydrateObject";
import deserializeDateMiddleware from "./middlewares/deserializeDateMiddleware";
import jsonApiMiddleware from "./middlewares/jsonApiMiddleware";

export interface RestActions<K> {
  handleAdd: (newCollectionItem: {
    data: Omit<K, "id">;
  }) => Promise<string | undefined>;
  handleUpdate: (id: string, data: { data: Omit<K, "id"> }) => Promise<void>;
  handleDelete: (collectionItemId: string) => Promise<void>;
}

export interface RestHooks<T, K> {
  useRestOne: (id: string) => APIResponse<T>;
  useRestList: () => APIResponse<T[]>;
  useRestActions: () => RestActions<K>;
}

interface ToastConfig {
  title: string;
}

export default function restBuilder<
  FrontEndData extends { id?: string; name?: string },
  BackEndData,
>(
  path: string,
  type: SerializerTypes,
  msgObject?: ToastConfig,
): RestHooks<FrontEndData, BackEndData> {
  function useRestList(
    queryParams?: QueriableList<BackEndData>,
  ): APIResponse<FrontEndData[]> {
    const { data: response, error } = useSWR<{ data: FrontEndData[] }, Error>(
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

  function useRestOne(id: string): APIResponse<FrontEndData> {
    const key = `${path}/${id}`;
    const { data: response, error } = useSWR<{ data: FrontEndData }, Error>(
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

  function useRestActions(): RestActions<BackEndData> {
    const { mutate } = useSWRConfig();
    const toast = useToast();

    const handleAdd = useCallback<
      (newCollectionItem: {
        data: Omit<BackEndData, "id">;
      }) => Promise<string | undefined>
    >(
      async (newCollectionItem: { data: Omit<BackEndData, "id"> }) => {
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
                data: FrontEndData;
              }>(deserializedItem, relationships);
              newItem = hydratedDeserialized.data;
            }
          }
          // -----------------------------------------------

          // mutate list data
          await mutate(
            path,
            async (addResponse: { data: FrontEndData[] }) => {
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
            async (updateCollectionItem: { data: FrontEndData }) => {
              return {
                data: { ...updateCollectionItem, ...newItem },
              };
            },
            false,
          );
          msgObject &&
            toast({
              title: `${msgObject.title} added`,
              description: `${newItem.name} was succesfully added!`,
              duration: 5000,
              isClosable: false,
              position: "bottom-right",
              variant: "left-accent",
              status: "success",
            });
          return newId;
        } catch (error) {
          if (error instanceof Error) {
            //console.log(error.message);
          }
        }
      },
      [mutate, toast],
    );
    const handleUpdate = useCallback<
      (id: string, data: { data: Omit<BackEndData, "id"> }) => Promise<void>
    >(
      async (id: string, data: { data: Omit<BackEndData, "id"> }) => {
        let { data: updatedItem } = await fetcher<{ data: FrontEndData }>(
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
              data: FrontEndData;
            }>(deserializedItem, relationships);
            updatedItem = hydratedDeserialized.data;
          }
        }
        // -----------------------------------------------

        // mutate list data
        await mutate(
          path,
          async (cachedData: { data: FrontEndData[] }) => {
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
          async (updateCollectionItem: { data: FrontEndData }) => {
            return {
              data: { ...updateCollectionItem, ...updatedItem },
            };
          },
          false,
        );
        msgObject &&
          toast({
            title: `${msgObject.title} updated`,
            description: `${updatedItem.name} was succesfully updated!`,
            duration: 5000,
            isClosable: false,
            position: "bottom-right",
            variant: "left-accent",
            status: "success",
          });
      },
      [mutate, toast],
    );

    const handleDelete = useCallback(
      async (collectionItemId: string) => {
        await fetcher("DELETE", type, `${path}/${collectionItemId}`);
        let name: string | undefined;
        // mutate list data
        await mutate(
          path,
          async (deleteResponse: { data: FrontEndData[] }) => {
            const toDelete = deleteResponse.data.find(
              (item) => item.id === collectionItemId,
            );
            name = toDelete ? toDelete.name : undefined;
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
          async (deleteResponse: { data: FrontEndData }) => {
            if (!name)
              name = deleteResponse
                ? deleteResponse.data.name
                : msgObject?.title;
            return {
              data: {},
            };
          },
          false,
        );
        msgObject &&
          toast({
            title: `${msgObject.title} updated`,
            description: ` ${name} was succesfully deleted!`,
            duration: 5000,
            isClosable: false,
            position: "bottom-right",
            variant: "left-accent",
            status: "success",
          });
      },
      [mutate, toast],
    );
    return {
      handleAdd,
      handleUpdate,
      handleDelete,
    };
  }
  return { useRestOne, useRestList, useRestActions };
}
