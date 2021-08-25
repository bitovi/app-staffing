interface APIInteraction<T> {
  data?: T;
  isLoading: boolean;
  error?: Error;
}

export interface APIRead<T> extends APIInteraction<T> {
  refresh: () => void;
}

export interface APICreate<T, U> extends APIInteraction<T> {
  create: (object: U) => void;
}

export interface Employee {
  id: string;
  avatar: string;
  name: string;
  title: string;
  startDate: string;
  endDate: string;
  skills: Skill[];
  available: boolean;
}

export interface Skill {
  name: string;
}

/**
 * A fetcher function for the `useSWR` hook.
 *
 * @param url The url to request
 * @returns the JSON formatted response
 */
export function fetcher<T>(url: string): Promise<T> {
  return fetch(url).then((response) => response.json());
}
