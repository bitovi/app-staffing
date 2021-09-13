export interface APIResponse<T> {
  data?: T;
  isLoading: boolean;
  error?: Error;
}

export interface Employee {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  skills: Skill[];
}

export type NewEmployee = Omit<Employee, "id">;

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
  assignmentStartDate?: string;
  assignmnetEndDate?: string;
}

export interface Role {
  id: string;
  skill: Skill;
  startDate: EstimatedDate;
  endDate: EstimatedDate;
  employees: AssignedEmployee[];
}

export interface EstimatedDate {
  date: string;
  confidence: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  roles: Role[];
}

export type NewProject = Omit<Project, "id">;

/**
 * A fetcher function for the `useSWR` hook.
 *
 * @param url The url to request
 * @returns the JSON formatted response
 */
export function fetcher<T>(url: string): Promise<T> {
  return fetch(url).then((response) => response.json());
}
