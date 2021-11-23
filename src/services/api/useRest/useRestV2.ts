import param from "can-param";
import { useCallback } from "react";
//import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { JSONAPISkill, Skill } from "..";
//import { JSONAPI } from "../baseMocks/interfaces";
import { FrontEndEmployee, JSONAPIEmployee } from "../employees/interfaces";
import type { APIResponse, QueriableList } from "../shared";
import { fetcher } from "../shared";
// import { skills } from "../skills/fixtures";
import { skillStoreManager } from "../skills/mocks";
// import { employeeDataFormatter } from "../useEmployees/useEmployees";
import deserializeDateMiddleware from "./middlewares/deserializeDateMiddleware";

interface RestActions<T> extends APIResponse<T> {
  handleAdd: (newCollectionItem: {
    data: FrontEndEmployee;
  }) => Promise<string | undefined>;
  reset: () => void;
  handleDelete: (collectionItemId: string) => Promise<void>;
}

function useRest<T>(
  path: string,
  queryParams?: QueriableList<T>,
): RestActions<T> {
  const key = `${path}?${param(queryParams)}`;

  const { mutate /*, cache*/ } = useSWRConfig();
  const { data: response, error } = useSWR<{ data: T }, Error>(
    key,
    (url) => fetcher("GET", url),
    {
      suspense: true,
      use: [deserializeDateMiddleware],
      // fallbackData added with pre-fetched data from localStorage
      // to provide persistent cache data while revalidate
      //**************************************************************************** */
      //commenting out during dev on branch to more easily test mock server responses
      // fallbackData: cache.get(key),
    },
  );
  const handleAdd = useCallback<
    (newCollectionItem: {
      data: FrontEndEmployee;
    }) => Promise<string | undefined>
  >(
    async (newCollectionItem: { data: FrontEndEmployee }) => {
      let newId = "";
      try {
        await mutate(
          key,
          async (addResponse: {
            data: { data: JSONAPIEmployee[]; included: JSONAPISkill[] };
          }) => {
            const { data: newItem } = await fetcher<{ data: JSONAPIEmployee }>(
              "POST",
              path,
              newCollectionItem,
            );
            newId = newItem.id;

            // Employee specific, ideally needs to be move outside of the useRest function
            // Fetches the skills by id for new employee & checks them
            // against the skills already in the included field of the cache
            // if the skill has no match, add it to cache; if it does
            // ignore it  V V.

            const newItemIncluded = await skillStoreManager.store.getListData({
              filter: {
                id: newItem.relationships.skills.data.map(
                  (skill: Skill) => skill.id,
                ),
              },
            });
            const skillsToAdd = newItemIncluded.data
              .filter((skill) => {
                if (
                  !addResponse.data.included.find(
                    (cacheObject: JSONAPISkill) => cacheObject.id === skill.id,
                  )
                ) {
                  return skill;
                }
              })
              // only maps those skills not already in the cache into the appropriate
              // data shape

              .map((skill) => ({
                type: "skills",
                id: skill.id,
                attributes: {
                  name: skill.name,
                },
              }));

            //^^^^^^

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
      } catch (error) {
        if (error instanceof Error) {
          //console.log(error.message);
        }
      }
    },
    [path, key, mutate],
  );

  const handleDelete = useCallback(
    async (collectionItemId: string) => {
      await mutate(
        key,
        async (deleteResponse: {
          data: { data: JSONAPIEmployee[]; included: JSONAPISkill[] };
        }) => {
          await fetcher("DELETE", `${path}/${collectionItemId}`);

          const newData = [
            ...deleteResponse.data.data.filter(
              (item) => item.id !== collectionItemId,
            ),
          ];
          //Employee specific, ideally needs to be moved outside of the useRest
          //function. Checks, after a delete, whether all the skills in "included"
          //are still connected to at least one employee. VV
          const newCache = {
            data: newData,
            included: [
              ...deleteResponse.data.included.filter((skill) => {
                if (
                  newData.find(
                    ({
                      relationships: {
                        skills: { data: employeeSkill },
                      },
                    }) =>
                      employeeSkill.some((eSkill) => eSkill.id === skill.id),
                  )
                ) {
                  return skill;
                }
              }),
            ],
          };
          //^^^^^^^^^^^^^^^^^^^
          return {
            ...deleteResponse,
            data: newCache,
          };
        },
        false,
      );
    },
    [path, key, mutate],
  );

  return {
    data: response?.data,
    handleAdd,
    handleDelete,
    error,
    isLoading: !response && !error,
    reset: () => mutate(key, (v: T) => v, false),
  };
}

export default useRest;
