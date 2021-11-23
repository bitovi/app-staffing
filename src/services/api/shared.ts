import { Filter } from "can-query-logic";
export interface APIResponse<T> extends ResponseStatus {
  data?: T | any;
}
console.log("fix this");
export interface ResponseStatus {
  isLoading: boolean;
  error?: Error;
}

export interface QueriableList<T> {
  filter?: Filter<T>;
  sort?: string;
  page?: number;
  count?: number;
}

export function fetcher<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body?: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
): Promise<T> {
  return fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
