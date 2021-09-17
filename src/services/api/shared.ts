import { Filter } from "can-query-logic";
export interface APIResponse<T> extends ResponseStatus {
  data?: T;
}

export interface ResponseStatus {
  isLoading: boolean;
  error?: Error;
}

export type QueriableList<T> = {
  filter?: Filter<T>;
  sort?: string;
  page?: number;
  count?: number;
};

export const skillList = [
  "React",
  "Angular",
  "DevOps",
  "Node",
  "UX",
  "Design",
] as const;

export type SkillName = typeof skillList[number];
export interface Skill {
  name: SkillName;
}

export function fetcher<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body?: Record<string, any>,
): Promise<T> {
  return fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
