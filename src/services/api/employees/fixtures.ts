import faker from "faker";
import { ResponseStatus } from "../shared";
import { EmployeeActions } from "../useEmployees/useEmployees";
import { EmployeeRecord } from "./interfaces";

faker.seed(0);

let employeeId = 0;

export function makeEmployee(): EmployeeRecord {
  const date = faker.date.past();
  return {
    id: `${++employeeId}`,
    name: faker.name.findName(),
    start_date: date,
    end_date: date,
  };
}

export const employees: EmployeeRecord[] = [
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
];

export const serializedEmployeeMockData = {
  data: [
    {
      type: "employees",
      id: "1",
      attributes: {
        name: "Vitor Forbrig",
        startDate: new Date(),
        endDate: new Date(),
      },
      relationships: {
        skills: {
          data: [
            {
              id: "105",
              type: "skills",
            },
            {
              id: "102",
              type: "skills",
            },
            {
              id: "101",
              type: "skills",
            },
          ],
        },
      },
    },
    {
      type: "employees",
      id: "3",
      attributes: {
        name: "Travis Draper",
        startDate: new Date(),
        endDate: new Date(),
      },
      relationships: {
        skills: {
          data: [
            {
              id: "105",
              type: "skills",
            },
          ],
        },
      },
    },
    {
      type: "employees",
      id: "2",
      attributes: {
        name: "Rosemarie Mitchell",
        startDate: new Date(),
        endDate: new Date(),
      },
      relationships: {
        skills: {
          data: [
            {
              id: "105",
              type: "skills",
            },
            {
              id: "101",
              type: "skills",
            },
          ],
        },
      },
    },
    {
      type: "employees",
      id: "4",
      attributes: {
        name: "Wilma Mueller",
        startDate: new Date(),
        endDate: new Date(),
      },
      relationships: {
        skills: {
          data: [
            {
              id: "105",
              type: "skills",
            },
            {
              id: "101",
              type: "skills",
            },
            {
              id: "105",
              type: "skills",
            },
          ],
        },
      },
    },
    {
      type: "employees",
      id: "5",
      attributes: {
        name: "Clifford Toy",
        startDate: new Date(),
        endDate: new Date(),
      },
      relationships: {
        skills: {
          data: [
            {
              id: "105",
              type: "skills",
            },
            {
              id: "102",
              type: "skills",
            },
            {
              id: "101",
              type: "skills",
            },
            {
              id: "108",
              type: "skills",
            },
          ],
        },
      },
    },
  ],
  included: [
    {
      type: "skills",
      id: "105",
      attributes: {
        name: "React",
      },
    },
    {
      type: "skills",
      id: "102",
      attributes: {
        name: "Angular",
      },
    },
    {
      type: "skills",
      id: "101",
      attributes: {
        name: "UX",
      },
    },
    {
      type: "skills",
      id: "108",
      attributes: {
        name: "Project Management",
      },
    },
  ],
};

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
    {
      id: "4",
      name: "Wilma Mueller",
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
        {
          id: "106",
          name: "React",
        },
      ],
    },
    {
      id: "5",
      name: "Clifford Toy",
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
        {
          id: "108",
          name: "Project Management",
        },
      ],
    },
  ];
  return {
    useEmployee: (id: string) => {
      return { data: employees[0] };
    },
    useEmployeeList: () => {
      return { data: employees };
    },
    useEmployeeActions: () => {
      return {
        addEmployee: (employee) => Promise.resolve(""),
        updateEmployee: (id) => Promise.resolve(),
        deleteEmployee: (id) => Promise.resolve(),
      };
    },
  };
};
