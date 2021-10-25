import { Fetcher, Key, SWRConfiguration, SWRHook } from "swr";

// This only works for ISO DateTime Strings in the format of "2020-01-01T00:00:00.000Z" where ms are optional (.000)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isIsoDateTime = (date: any) =>
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/.test(
    date,
  );

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function parseDate(obj: any): void {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      parseDate(obj[key]);
    } else {
      if (isIsoDateTime(obj[key])) {
        obj[key] = new Date(obj[key]);
      }
    }
  }
}

function deserializeDateMiddleware<T>(useSWRNext: SWRHook): any {
  return (
    key: Key,
    fetcher: Fetcher<T> | null,
    config: SWRConfiguration<T, Error>,
  ) => {
    const swr = useSWRNext(key, fetcher, config);

    const { data } = swr;
    parseDate(data);
    return Object.assign({}, swr, {
      data,
    });
  };
}

export default deserializeDateMiddleware;
