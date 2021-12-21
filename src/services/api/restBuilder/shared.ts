import type { Filter } from "can-query-logic";
import type { JSONAPIDocument } from "json-api-serializer";
import type { SerializerTypes } from "./getJsonApiSerializer";

export interface APIResponse<T> extends ResponseStatus {
  data?: T;
}

export interface ResponseStatus {
  isLoading?: boolean;
  error?: Error;
}

export interface QueriableList<T> {
  filter?: Filter<T>;
  sort?: string;
  page?: number;
  count?: number;
  include?: string;
}

class HttpError extends Error {
  status?: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function fetcher(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  type: SerializerTypes,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any>,
): Promise<JSONAPIDocument> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    body: body && JSON.stringify(body),
  });

  if (!response.ok) {
    throw new HttpError(
      response.status,
      `An error occurred while fetching: ${method} ${url}`,
    );
  }

  return await response.json();
}
