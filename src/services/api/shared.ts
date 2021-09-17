// --- @todo move these to their own shared once mocks are pull out
import { Filter } from "can-query-logic";

export type MockResponse<D = undefined, M = undefined> = {
  data?: D;
  metadata?: M;
  error?: string;
};

export type QueriableList<T> = {
  filter: Filter<T>;
  sort: string;
  page?: number;
  count?: number;
};

class DateStringSet {
  constructor(public value: string) {
    this.value = value;
  }
  // used to convert to a number
  valueOf(): number {
    return new Date(this.value).getTime();
  }

  [Symbol.for("can.serialize")]() {
    return this.value;
  }
}

export const DateString = {
  [Symbol.for("can.new")]: function (v: string): string {
    return v;
  },
  [Symbol.for("can.SetType")]: DateStringSet,
};

// -- end @todo

export interface APIResponse<T> extends ResponseStatus {
  data?: T;
}

export interface ResponseStatus {
  isLoading: boolean;
  error?: Error;
}

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
  body?: any,
): Promise<T> {
  return fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
