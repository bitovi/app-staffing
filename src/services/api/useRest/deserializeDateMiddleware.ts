import { Fetcher, Key, SWRConfiguration, SWRHook } from "swr";

const isDate = (date: any) =>
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/.test(
    date,
  );
function parseDate(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      parseDate(obj[key]);
    } else {
      if (isDate(obj[key])) {
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
