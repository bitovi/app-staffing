class HttpError extends Error {
  status?: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const API_BASE_URL = window.env.API_BASE_URL;
const API_AUTH_TOKEN = window.env.API_AUTH_TOKEN;

export default async function fetcher<T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any>,
): Promise<T | undefined> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      Authorization: `BASIC ${API_AUTH_TOKEN}`,
    },
    body: body && JSON.stringify(body),
  });

  if (!response.ok) {
    throw new HttpError(
      response.status,
      `An error occurred while fetching: ${method} ${url}`,
    );
  }

  try {
    return await response.json();
  } catch (e) {
    return undefined;
  }
}
