import faker from "faker";
import type { EmployeeTable } from "./interfaces";

faker.seed(0);

let employeeId = 0;

export function makeEmployee(): EmployeeTable {
  const startDate = faker.date.past();

  return {
    id: `${++employeeId}`,
    name: faker.name.findName(),
    startDate: startDate,
    endDate: startDate,
  };
}

export const employees: EmployeeTable[] = [
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
];
