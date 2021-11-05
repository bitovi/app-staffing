import param from "can-param";
//import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import type { APIResponse, QueriableList } from "../shared";
import { fetcher } from "../shared";
import deserializeDateMiddleware from "./middlewares/deserializeDateMiddleware";

interface RestActions<T> extends APIResponse<T> {
  reset: () => void;
}

function useRest<T>(
  path: string,
  queryParams?: QueriableList<T>,
): RestActions<T> {
  const key = `${path}?${param(queryParams)}`;

  const { mutate } = useSWRConfig();

  const { data: response, error } = useSWR<{ data: T }, Error>(
    key,
    (url) => fetcher("GET", url),
    { suspense: true, use: [deserializeDateMiddleware] },
  );

  return {
    data: response?.data,
    error,
    isLoading: !response && !error,
    reset: () => mutate(key, (v: T) => v, false),
  };
}

export default useRest;
