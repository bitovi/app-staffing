import { Fetcher, Key, SWRConfiguration, SWRHook, SWRResponse } from "swr";
import getJsonApiSerializer, { SerializerTypes } from "../getJsonApiSerializer";

const jsonApiMiddleware = (type: SerializerTypes) => (useSWRNext: SWRHook) => {
  return <T, K>(
    key: Key,
    fetcher: Fetcher<T> | null,
    config: SWRConfiguration<T, K>,
  ): SWRResponse<T, K> => {
    const swr = useSWRNext(key, fetcher, config);
    const { data } = swr;
    let serializedData = data;
    if (process.env.NODE_ENV === "production") {
      serializedData = getJsonApiSerializer().deserialize(type, data ?? {});
    }

    return Object.assign({}, swr, {
      data: serializedData,
    });
  };
};

export default jsonApiMiddleware;
