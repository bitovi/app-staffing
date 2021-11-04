import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Employees, EmployeePageLoadingLayout } from "./Employees";

export default {
  title: "Pages/Employees",
  component: Employees,
} as ComponentMeta<typeof Employees>;

const employeeMockData = () => {
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
      id: "1",
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
      id: "1",
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

export const nonEmpty: ComponentStory<typeof Employees> = ({ ...props }) => (
  <Employees
    {...props}
    useEmployees={employeeMockData}
    useSkills={(): any => {
      return { skills: null };
    }}
  />
);

export const Empty: ComponentStory<typeof Employees> = ({ ...props }) => (
  <Employees
    {...props}
    useEmployees={() => {
      return {
        isLoading: false,
        employees: [],
        addEmployee: (employee) => new Promise((resolve) => resolve("")),
        deleteEmployee: (employeeId) => new Promise((resolve) => resolve()),
        updateEmployee: (employeeId) => new Promise((resolve) => resolve()),
        reset: () => undefined,
      };
    }}
    useSkills={(): any => {
      return { skills: null };
    }}
  />
);

export const Loading: ComponentStory<any> = ({ ...props }) => (
  <EmployeePageLoadingLayout {...props} />
);
