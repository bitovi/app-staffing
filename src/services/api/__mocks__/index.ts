import { employees } from "../fixtures";

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

export async function getData(): Promise<Employee[]> {
  return employees;
}
