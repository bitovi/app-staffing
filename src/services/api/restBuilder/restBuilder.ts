import type { Filter } from "can-query-logic";

import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import param from "can-param";
import { useToast } from "../../toast";

import fetcher from "./fetcher";

import serializer, { SerializerTypes } from "./serializer";
import parseDate from "./parseDate";

interface ListQuery<T> {
  filter?: Filter<T>;
  sort?: string;
  page?: number;
  count?: number;
  include?: string;
}

export interface BaseData {
  id: string;
  name?: string;
}

export default function restBuilder<Data extends BaseData>(
  path: string,
  type: SerializerTypes,
  messages?: {
    title: string;
  },
): {
  useRestList: (query?: ListQuery<Data>) => Data[];
  useRestOne: (id: string) => Data;
  useRestMutations: () => {
    create: (data: Partial<Omit<Data, "id">>) => Promise<string | undefined>;
    update: (id: string, data: Partial<Data> & { id: string }) => Promise<void>;
    destroy: (id: string) => Promise<void>;
  };
} {
  function useRestList(query?: ListQuery<Data>): Data[] {
    const { data, error } = useSWR<Data[], Error>(
      path,
      async (path) => {
        const response = await fetcher("GET", type, `${path}?${param(query)}`);

        const list = serializer.deserialize(type, response) as Data[];
        for (const item of list) {
          parseDate(item);
        }

        return list;
      },
      {
        suspense: true,
      },
    );

    if (error || !data) {
      throw error || new Error(`Unable to fetch ${path}`);
    }

    return data;
  }

  function useRestOne(id: string): Data {
    const { data, error } = useSWR<Data, Error>(
      `${path}/${id}`,
      async (path) => {
        const response = await fetcher("GET", type, path);

        const item = serializer.deserialize(type, response) as Data;
        parseDate(item);

        return item;
      },
      {
        suspense: true,
      },
    );

    if (error || !data) {
      throw error || new Error(`Unable to fetch ${path}/${id}`);
    }

    return data;
  }

  function useRestMutations() {
    const toast = useToast();
    const { mutate } = useSWRConfig();

    const create = useCallback(
      async (data: Partial<Omit<Data, "id">>) => {
        const payload = serializer.serialize(type, data);
        const response = await fetcher("POST", type, path, payload);
        const deserialized = serializer.deserialize(type, response) as Data;
        const identifier = deserialized.name || deserialized.id;

        parseDate(deserialized);

        // mutate list cache
        await mutate(
          path,
          async (cache: Data[] | undefined) => {
            if (!cache) {
              return cache;
            }

            return [...cache, deserialized];
          },
          false,
        );

        // mutate individual cache
        await mutate(
          `${path}/${deserialized.id}`,
          async (cache: Data) => {
            return deserialized;
          },
          false,
        );

        if (messages) {
          toast({
            title: `${messages.title} added`,
            description: `${identifier} was succesfully added!`,
          });
        }

        return deserialized.id;
      },
      [toast, mutate],
    );

    const update = useCallback(
      async (id: string, data: Partial<Data> & { id: string }) => {
        const payload = serializer.serialize(type, data);
        const response = await fetcher("PATCH", type, `${path}/${id}`, payload);
        const deserialized = serializer.deserialize(type, response) as Data;
        const identifier = deserialized.name || deserialized.id;

        parseDate(deserialized);

        // mutate list cache
        await mutate(
          path,
          async (cache: Data[] | undefined) => {
            if (!cache) {
              return cache;
            }

            const index = cache.findIndex(
              (item) => item.id === deserialized.id,
            );

            if (index > -1) {
              return [
                ...cache.slice(0, index),
                deserialized,
                ...cache.slice(index + 1),
              ];
            }

            return [...cache, deserialized];
          },
          false,
        );

        // mutate individual cache
        await mutate(
          `${path}/${id}`,
          async (cache: Data) => {
            return deserialized;
          },
          false,
        );

        if (messages) {
          toast({
            title: `${messages.title} updated`,
            description: `${identifier} was succesfully updated!`,
          });
        }
      },
      [toast, mutate],
    );

    const destroy = useCallback(
      async (id: string) => {
        await fetcher("DELETE", type, `${path}/${id}`);
        let identifier: string | undefined = undefined;

        // mutate list cache
        await mutate(
          path,
          async (cache: Data[] | undefined) => {
            if (!cache) {
              return cache;
            }

            const item = cache.find((item) => item.id === id);
            if (item) {
              identifier = item.name;
            }

            return cache.filter((item) => item.id !== id);
          },
          false,
        );

        // mutate individual cache
        await mutate(
          `${path}/${id}`,
          async (cache: Data) => {
            if (cache && !identifier) {
              identifier = cache.name;
            }

            return undefined;
          },
          false,
        );

        if (messages) {
          toast({
            title: `${messages.title} deleted`,
            description: `${identifier || id} was successfully deleted!`,
          });
        }
      },
      [toast, mutate],
    );

    return {
      create,
      update,
      destroy,
    };
  }

  return { useRestOne, useRestList, useRestMutations };
}
