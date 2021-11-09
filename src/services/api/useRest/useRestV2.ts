import param from "can-param";
import { useCallback } from "react";
//import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { JSONAPISkill } from "..";
import { FrontEndEmployee } from "../employees/interfaces";
import type { APIResponse, QueriableList } from "../shared";
import { fetcher } from "../shared";
// import { skills } from "../skills/fixtures";
import { skillStoreManager } from "../skills/mocks";
// import { employeeDataFormatter } from "../useEmployees/useEmployees";
import deserializeDateMiddleware from "./middlewares/deserializeDateMiddleware";

///////////////////////////////////////////////////////////////////
// ** V2 is still not abstracted enough for consumption by all endpoints
// ** Currently implementing TypeScript unions to check for specific types
// ** for example in the interface below
///////////////////////////////////////////////////////////////////
interface RestActions<T> extends APIResponse<T> {
  handleAdd: (
    newCollectionItem: { data: FrontEndEmployee } | Omit<JSONAPISkill, "id">,
  ) => Promise<string>;
  reset: () => void;
}

function useRest<T>(
  path: string,
  queryParams?: QueriableList<T>,
): RestActions<T> {
  const key = `${path}?${param(queryParams)}`;

  const { mutate } = useSWRConfig();

  const { data: response, error } = useSWR<{ data: T | any }, Error>(
    key,
    (url) => fetcher("GET", url),
    { suspense: true, use: [deserializeDateMiddleware] },
  );

  const handleAdd = useCallback<
    (
      newCollectionItem: { data: FrontEndEmployee } | Omit<JSONAPISkill, "id">,
    ) => Promise<string>
  >(
    async (
      newCollectionItem: { data: FrontEndEmployee } | Omit<JSONAPISkill, "id">,
    ) => {
      let newId = "";
      await mutate(
        key,
        async (addResponse: { data: any }) => {
          const { data: newItem } = await fetcher<{ data: any }>(
            "POST",
            path,
            newCollectionItem,
          );

          newId = newItem.id;
          const newItemIncluded = await skillStoreManager.store.getListData({
            filter: {
              id: newItem.relationships.skills.data.map(
                (skill: any) => skill.id,
              ),
            },
          });
          const skillsToAdd = newItemIncluded.data
            .filter((skill) => {
              if (
                !addResponse.data.included.find(
                  (cacheObject: any) => cacheObject.id === skill.id,
                )
              ) {
                return skill;
              }
            })
            .map((skill) => ({
              type: "skills",
              id: skill.id,
              attributes: {
                name: skill.name,
              },
            }));

          const newCache = {
            data: [...addResponse.data.data, newItem],
            included: [...addResponse.data.included, ...skillsToAdd],
          };

          return {
            ...addResponse,
            data: newCache,
          };
        },
        false,
      );
      return newId;
    },
    [path, key, mutate],
  );

  return {
    data: response?.data,
    handleAdd,
    error,
    isLoading: !response && !error,
    reset: () => mutate(key, (v: T) => v, false),
  };
}

export default useRest;
