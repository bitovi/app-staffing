import type { JSONAPIDocument } from "json-api-serializer";
import type { SerializerTypes } from "../serializer";

class HttpError extends Error {
  status?: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const API_BASE_URL = window.env.API_BASE_URL;

export default async function fetcher(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  type: SerializerTypes,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any>,
): Promise<JSONAPIDocument> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
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
