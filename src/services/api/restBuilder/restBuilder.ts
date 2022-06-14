import type { JSONAPIDocument } from "json-api-serializer";
import type { Filter } from "can-query-logic";

import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import type { mutate as Mutate } from "swr";
import param from "can-param";
import { useToast } from "../../toast";

import fetcher from "./fetcher";

import serializer, { SerializerTypes } from "./serializer";
import parseDate from "./parseDate";
import formatISO from "date-fns/formatISO";
import snakeCase from "lodash/snakeCase";

interface ListQuery<T> {
  filter?: Filter<T>;
  sort?: string;
  page?: number;
  count?: number;
  include?: string | string[];
}

interface OneQuery {
  include?: string | string[];
}

export interface BaseData {
  id: string;
  name?: string;
}

interface ParentStore {
  path: string;
  sourceRelationship: string;
}

export default function restBuilder<Data extends BaseData>(
  path: string,
  type: SerializerTypes,
  messages?: {
    title: string;
  },
  parentStore?: ParentStore,
): {
  useRestList: (query?: ListQuery<Data>) => Data[];
  useRestOne: (id: string, query?: OneQuery) => Data;
  useRestMutations: () => {
    create: (data: Partial<Omit<Data, "id">>) => Promise<string | undefined>;
    update: (id: string, data: Partial<Data>) => Promise<void>;
    destroy: (id: string) => Promise<void>;
  };
} {
  function useRestList(query?: ListQuery<Data>): Data[] {
    const { data, error } = useSWR<Data[], Error>(
      path,
      async (path) => {
        const response = await fetcher<JSONAPIDocument>(
          "GET",
          makeUrl(path, query),
        );

        if (response) {
          const list = serializer.deserialize(type, response) as Data[];
          for (const item of list) {
            parseDate(item);
          }

          return list;
        } else {
          return [];
        }
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

  function useRestOne(id: string, query?: OneQuery): Data {
    const { data, error } = useSWR<Data, Error>(
      `${path}/${id}`,
      async (path) => {
        const response = await fetcher<JSONAPIDocument>(
          "GET",
          makeUrl(path, query),
        );

        if (response) {
          const item = serializer.deserialize(type, response) as Data;
          parseDate(item);

          return item;
        } else {
          return {} as Data;
        }
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
      async (
        data: Partial<Omit<Data, "id">>,
        identifier?: string,
        updateParentCache?: boolean,
      ) => {
        const payload = serializer.serialize(type, data);
        const response = await fetcher<JSONAPIDocument>("POST", path, payload);

        if (response) {
          const deserialized = serializer.deserialize(type, response) as Data;

          if (!identifier) identifier = deserialized.name || deserialized.id;

          parseDate(deserialized);

          // mutate list cache
          await mutate(
            path,
            async (cache: Data[] | undefined) => {
              if (!cache || updateParentCache) {
                if (parentStore) {
                  const source = (deserialized[
                    parentStore.sourceRelationship as keyof BaseData
                  ] as unknown) as BaseData;
                  mutateParentCache(
                    mutate,
                    type,
                    parentStore,
                    source.id,
                    "Create",
                    deserialized,
                  );
                }
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
        }
      },
      [toast, mutate],
    );

    const update = useCallback(
      async (
        id: string,
        data: Partial<Data>,
        identifier?: string,
        undefinedValues?: string[],
        updateParentCache?: boolean,
      ) => {
        const payload = serializer.serialize(type, { ...data, id });
        const response = await fetcher<JSONAPIDocument>(
          "PATCH",
          `${path}/${id}`,
          payload,
          undefinedValues,
        );

        if (response) {
          const deserialized = serializer.deserialize(type, response) as Data;

          if (!identifier) identifier = deserialized.name || deserialized.id;

          parseDate(deserialized);

          // mutate list cache
          await mutate(
            path,
            async (cache: Data[] | undefined) => {
              if (!cache || updateParentCache) {
                if (parentStore) {
                  const source = (deserialized[
                    parentStore.sourceRelationship as keyof BaseData
                  ] as unknown) as BaseData;
                  mutateParentCache(
                    mutate,
                    type,
                    parentStore,
                    source.id,
                    "Update",
                    deserialized,
                  );
                }
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
              return { ...cache, ...deserialized };
            },
            false,
          );

          if (messages) {
            toast({
              title: `${messages.title} updated`,
              description: `${identifier} was succesfully updated!`,
            });
          }
        }
      },
      [toast, mutate],
    );

    const destroy = useCallback(
      async (
        id: string,
        parentId?: string,
        identifier?: string,
        updateParentCache?: boolean,
      ) => {
        await fetcher<undefined>("DELETE", `${path}/${id}`);

        // mutate list cache
        await mutate(
          path,
          async (cache: Data[] | undefined) => {
            if (!cache || updateParentCache) {
              if (parentStore && parentId) {
                mutateParentCache(
                  mutate,
                  type,
                  parentStore,
                  parentId,
                  "Delete",
                  undefined,
                  id,
                );
              }
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

function makeUrl<T>(path: string, query?: ListQuery<T>): string {
  query = { ...query } as T;

  if (Array.isArray(query.include)) {
    query.include = query.include.join(",");
  }

  if (query.filter) {
    const filter: Filter<T> = {};
    for (const key in query.filter) {
      const comparators = query.filter[key];
      const newComparators: Record<string, string> = {};

      for (const comparator in comparators) {
        const comparatorValue = comparators[comparator];
        if (comparatorValue instanceof Date) {
          newComparators[comparator] = formatISO(comparatorValue);
        } else if (typeof comparatorValue === "number") {
          newComparators[comparator] = comparatorValue.toString();
        } else if (typeof comparatorValue === "string") {
          newComparators[comparator] = comparatorValue;
        }
      }
      filter[snakeCase(key) as keyof T] = newComparators;
    }
    query.filter = filter;
  }

  return `${path}?${param(query)}`;
}

async function mutateParentCache(
  mutate: typeof Mutate,
  type: string,
  parentStore: ParentStore,
  parentId: string,
  operation: "Create" | "Update" | "Delete",
  deserialized?: BaseData,
  id?: string,
) {
  await mutate(
    `${parentStore.path}/${parentId}`,
    async (parentCache: BaseData | undefined) => {
      if (!parentCache) {
        return parentCache;
      }

      let cache = (parentCache[
        type as keyof BaseData
      ] as unknown) as BaseData[];

      switch (operation) {
        case "Create":
          if (deserialized) cache.push(deserialized);
          break;
        case "Update":
        // To do
        case "Delete":
          cache = cache.filter((item) => item.id !== id);
          break;
        default:
      }

      return { ...parentCache, [type as keyof BaseData]: cache };
    },
  );
}
