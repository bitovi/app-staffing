import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { employees } from "../../services/api/employees/fixtures";
import Employees from "./Employees";

export default {
  title: "Pages/Employees",
  component: Employees,
} as ComponentMeta<typeof Employees>;

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
      };
    }}
  />
);

export const nonEmpty: ComponentStory<typeof Employees> = ({ ...props }) => (
  <Employees
    {...props}
    useEmployees={() => {
      return {
        isLoading: false,
        employees: employees,
        addEmployee: (employee) => new Promise((resolve) => resolve("")),
        deleteEmployee: (employeeId) => new Promise((resolve) => resolve()),
        updateEmployee: (employeeId) => new Promise((resolve) => resolve()),
      };
    }}
  />
);

export const Loading: ComponentStory<typeof Employees> = ({ ...props }) => (
  <Employees
    {...props}
    useEmployees={() => {
      throw new Promise(() => undefined);
    }}
  />
);
