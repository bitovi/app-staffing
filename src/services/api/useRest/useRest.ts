import type { APIResponse } from "../shared";

import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../shared";
import { QueriableList } from "../shared";
import { values } from "lodash";

interface RestActions<T> extends APIResponse<T[]> {
  useAdd: (newCollectionItem: Omit<T, "id">) => Promise<string>;
  useUpdate: (
    collectionItemId: string,
    updatedCollectionItem: Partial<T>,
  ) => Promise<void>;
}

function useRest<T extends { id: string }>(
  path: string,
  queryParams?: QueriableList<T>,
): RestActions<T> {
  // const createQuery = (): string => {
  //   if (!queryParams) return "";

  //   let query = "?";

  //   if (queryParams.count) {
  //     query += `count=${queryParams.count}&`;
  //   }

  //   if (queryParams.page) {
  //     query += `page=${queryParams.page}&`;
  //   }

  //   if (queryParams.filter) {
  //     query += `filter=${queryParams.filter}&`;
  //   }

  //   if (queryParams.sort) {
  //     query += `sort=${queryParams.sort}&`;
  //   }

  //   return query[query.length - 1] === "&" ? query.slice(0, -1) : query;
  // };

  const { data: response, error } = useSWR<{ data: T[] }, Error>(
    `${path}?${new URLSearchParams({
      // count: queryParams!.count!.toString(),
      // page: queryParams!.page!.toString(),
      filter: JSON.stringify(queryParams!.filter),
    })}`,
    (url) => {
      console.log(url);
      return fetcher("GET", url);
    },
  );

  const useAdd = useCallback<
    (newCollectionItem: Omit<T, "id">) => Promise<string>
  >(
    async (newCollectionItem: Omit<T, "id">) => {
      let newId = "";
      await mutate(path, async (addResponse: { data: T[] }) => {
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
      });

      return newId;
    },
    [path],
  );

  const useUpdate = useCallback<
    (
      collectionItemId: string,
      updatedCollectionItem: Partial<T>,
    ) => Promise<void>
  >(
    async (collectionItemId: string, updatedCollectionItem: Partial<T>) => {
      await mutate(path, async (updateResponse: { data: T[] }) => {
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
