import { useToast } from "@chakra-ui/toast";
import param from "can-param";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { JSONAPIDocument } from "json-api-serializer";
import type { APIResponse, QueriableList } from "../shared";
import { fetcher } from "../shared";
import getJsonApiSerializer, { SerializerTypes } from "./getJsonApiSerializer";
import deserializeDateMiddleware from "./middlewares/deserializeDateMiddleware";

export interface RestActions<K> {
  create: (newCollectionItem: {
    data: Omit<K, "id">;
  }) => Promise<string | undefined>;
  update: (id: string, data: { data: Omit<K, "id"> }) => Promise<void>;
  destroy: (collectionItemId: string) => Promise<void>;
}

export interface RestHooks<T> {
  useRestOne: (id: string) => APIResponse<T>;
  useRestList: (queryParams?: QueriableList<T>) => APIResponse<T[]>;
  useRestActions: () => RestActions<T>;
}

interface ToastConfig {
  title: string;
}

const jsonApiSerializer = getJsonApiSerializer();

export default function restBuilder<
  FrontEndData extends { id?: string; name?: string },
>(
  path: string,
  type: SerializerTypes,
  msgObject?: ToastConfig,
): RestHooks<FrontEndData> {
  function useRestList(
    queryParams?: QueriableList<FrontEndData>,
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

  function useRestActions(): RestActions<FrontEndData> {
    const { mutate } = useSWRConfig();
    const toast = useToast();

    const create = useCallback(
      async (newCollectionItem: { data: Omit<FrontEndData, "id"> }) => {
        const payload = jsonApiSerializer.serialize(
          type,
          newCollectionItem.data,
        );

        try {
          const response = await fetcher<JSONAPIDocument>(
            "POST",
            type,
            path,
            payload,
          );
          const deserialized = jsonApiSerializer.deserialize(type, response);

          // mutate list data
          await mutate(
            path,
            async (addResponse: { data: FrontEndData[] }) => {
              return {
                ...addResponse,
                data: [...addResponse.data, deserialized],
              };
            },
            false,
          );

          // mutate individual resource cache key
          const resourceId = deserialized.id;
          await mutate(
            `${path}/${resourceId.id}`,
            async (updateCollectionItem: { data: FrontEndData }) => {
              return {
                data: { ...updateCollectionItem, ...deserialized },
              };
            },
            false,
          );

          if (msgObject) {
            toast({
              title: `${msgObject.title} added`,
              description: `${deserialized.name} was succesfully added!`,
              duration: 5000,
              isClosable: false,
              position: "bottom-right",
              variant: "left-accent",
              status: "success",
            });
          }

          return resourceId;
        } catch (error) {
          throw error;
        }
      },
      [mutate, toast],
    );

    const update = useCallback(
      async (id: string, patchedData: { data: Omit<FrontEndData, "id"> }) => {
        const payload = jsonApiSerializer.serialize(type, patchedData.data);

        const response = await fetcher<JSONAPIDocument>(
          "PATCH",
          type,
          `${path}/${id}`,
          payload,
        );

        const deserializedItem = jsonApiSerializer.deserialize(type, response);

        // mutate list data
        await mutate(
          path,
          async (cachedData: { data: FrontEndData[] }) => {
            return {
              ...cachedData,
              data: (cachedData?.data ?? []).map((item) =>
                item?.id === deserializedItem?.id ? deserializedItem : item,
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
              data: { ...updateCollectionItem, ...deserializedItem },
            };
          },
          false,
        );

        if (msgObject) {
          toast({
            title: `${msgObject.title} updated`,
            description: `${deserializedItem?.name} was succesfully updated!`,
            duration: 5000,
            isClosable: false,
            position: "bottom-right",
            variant: "left-accent",
            status: "success",
          });
        }
      },
      [mutate, toast],
    );

    const destroy = useCallback(
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

        if (msgObject) {
          toast({
            title: `${msgObject.title} deleted`,
            description: ` ${name} was successfully deleted!`,
            duration: 5000,
            isClosable: false,
            position: "bottom-right",
            variant: "left-accent",
            status: "success",
          });
        }
      },
      [mutate, toast],
    );

    return {
      create,
      update,
      destroy,
    };
  }

  return { useRestOne, useRestList, useRestActions };
}
