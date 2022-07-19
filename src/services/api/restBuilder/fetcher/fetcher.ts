export class HttpError extends Error {
  status?: number;
  serverErrorMessages?: string;

  constructor(status: number, message: string, serverErrorMessages: string) {
    super(message);
    this.status = status;
    this.serverErrorMessages = serverErrorMessages;
  }
}

const API_BASE_URL = window.env.API_BASE_URL;
const API_AUTH_TOKEN = window.env.API_AUTH_TOKEN;

export default async function fetcher<T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any>,
  undefinedValues?: string[],
): Promise<T | undefined> {
  const headers: Record<string, string> = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  };

  if (API_AUTH_TOKEN) {
    headers.Authorization = `BASIC ${API_AUTH_TOKEN}`;
  }

  const replacer = (key: string, value: string) => {
    return undefinedValues?.includes(key) && typeof value === "undefined"
      ? null
      : value;
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers,
    body: body && JSON.stringify(body, replacer),
  });

  if (!response.ok) {
    let serverErrorMessages = "";
    try {
      const jsonResponse = await response.json();

      if (jsonResponse?.errors?.forEach) {
        for (let i = 0; i < jsonResponse.errors.length; i++) {
          serverErrorMessages += "\n" + (jsonResponse.errors[i].title || "");
        }
      }
    } catch (e) {
      serverErrorMessages = "Could not forward server errors.";
    }
    throw new HttpError(
      response.status,
      `An error occurred while fetching: ${method} ${url}`,
      serverErrorMessages,
    );
  }

  try {
    return await response.json();
  } catch (e) {
    return undefined;
  }
}
