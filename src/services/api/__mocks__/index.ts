  avatar: string;
export interface Employee {
  id: number;
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

export async function getData(): Promise<CardData[]> {
  return employeeData;
}
