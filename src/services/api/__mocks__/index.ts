export interface Employee {
  id: string;
  name: string;
  title: string;
  startDate: string;
  endDate: string;
  skills: {
    name: string;
  }[];
  available: boolean;
}

import { employeeData } from "../mocks";

export async function getData(): Promise<Employee[]> {
  return employeeData;
}
