import faker from "faker";
import { ResponseStatus } from "../shared";
import { EmployeeActions } from "../useEmployees/useEmployees";
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

export const employeeMockData = (): ResponseStatus & EmployeeActions => {
  const employees = [
    {
      id: "1",
      name: "Vitor Forbrig",
      startDate: new Date(),
      endDate: new Date(),
      skills: [
        {
          id: "105",
          name: "React",
        },
        {
          id: "102",
          name: "Angular",
        },
        {
          id: "101",
          name: "UX",
        },
      ],
    },
    {
      id: "3",
      name: "Travis Draper",
      startDate: new Date(),
      endDate: new Date(),
      skills: [
        {
          id: "106",
          name: "React",
        },
      ],
    },
    {
      id: "2",
      name: "Rosemarie Mitchell",
      startDate: new Date(),
      endDate: new Date(),
      skills: [
        {
          id: "107",
          name: "React",
        },
        {
          id: "101",
          name: "UX",
        },
      ],
    },
  ];
  return {
    employees,
    isLoading: false,
    reset: () => undefined,
  };
};
