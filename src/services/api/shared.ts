import { Filter } from "can-query-logic";
import { SerializerTypes } from "./restBuilder/getJsonApiSerializer";
import jsonApiMiddleware from "./restBuilder/middlewares/jsonApiMiddleware";
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
}

export async function fetcher<T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",

  type: SerializerTypes,
  url: string,
  body?: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
): Promise<T> {
  const jsonResponse = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await jsonResponse.json();

  // "undefined" is a temporary measure to avoid breaking endpoints which haven't
  // converted to JSON API fully; otherwise, the deserializer omits much of the
  // REST formatted data in its response object.
  // Only running this conditional on GET requests, as they should contain
  // an "included" field for relationship fields hydration, which is necessary
  // for the deserializer
  if (type !== "undefined" && method === "GET") {
    // this middleware is located here rather than within the SWR middleware
    // as the response from fetch sets the shape of the SWR cache;
    // therefore, deserializing here allows us to have a localStorage SWR cache in the shape
    // of the frontend
    const [deserialized] = jsonApiMiddleware(response, type);

    return deserialized;
  } else {
    return response;
  }
}
