export interface APIResponse<T> {
  data?: T;
  isLoading: boolean;
  error?: Error;
}

export interface NewEmployee {
  avatar: string;
  name: string;
  title: string;
  startDate: string;
  endDate: string;
  skills: Skill[];
  available: boolean;
}

export interface Employee extends NewEmployee {
  id: string;
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

export interface AssignedEmployee extends Employee {
  projectStartDate: string;
  projectEndDate: string;
}

export interface Project {
  id: string;
  role: string;
  startDate: string;
  endDate: string;
  startConfidence: number;
  endConfidence: number;
  assignedEmployees: AssignedEmployee[];
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
