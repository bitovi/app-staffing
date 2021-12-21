import type { Fetcher, Key, SWRConfiguration, SWRHook } from "swr";

export const isIsoDateTime = (date: string): boolean => {
  // This only works for ISO DateTime Strings in the format of "2020-01-01T00:00:00.000Z" where ms are optional.
  return /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/.test(
    date,
  );
};

// todo: make default
export function parseDate(data: any): void {
  if (typeof data === "undefined") {
    return;
  }

  if (typeof data === "object" && data !== null) {
    for (const key in data) {
      const value = data[key];

      if (typeof value === "string" && isIsoDateTime(value)) {
        data[key] = new Date(value);
        continue;
      }

      parseDate(value as Record<string, unknown>);
    }
  }
}

export default function parseDateMiddleware<T>(useSWRNext: SWRHook): any {
  return (
    key: Key,
    fetcher: Fetcher<T> | null,
    config: SWRConfiguration<T, Error>,
  ) => {
    const response = useSWRNext(key, fetcher, config);

    const { data } = response;
    if (data) {
      parseDate(data);
    }

    return {
      ...response,
      data,
    };
  };
}
