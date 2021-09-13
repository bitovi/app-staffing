export interface APIResponse<T> extends ResponseStatus {
  data?: T;
}

export interface ResponseStatus {
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

export function fetcher<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body?: Record<string, any>,
): Promise<T> {
  return fetch(url, { method, body: JSON.stringify(body) }).then((response) =>
    response.json(),
  );
}
