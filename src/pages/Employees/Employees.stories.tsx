import type { ComponentStory, ComponentMeta } from "@storybook/react";
// import { employees } from "../../services/api/employees/fixtures";
import EmployeesWrapper, { Employees, EmployeePageLoadingLayout } from "./Employees";
import {useEmployees, useSkills} from '../../services/api'

export default {
  title: "Pages/Employees",
  component: EmployeesWrapper,
} as ComponentMeta<typeof Employees>;

export const Empty: ComponentStory<typeof Employees> = ({ ...props }) => (
  <EmployeesWrapper
    {...props}
    /*useEmployees={() => {
      return {
        isLoading: false,
        employees: [],
        addEmployee: (employee) => new Promise((resolve) => resolve("")),
        deleteEmployee: (employeeId) => new Promise((resolve) => resolve()),
        updateEmployee: (employeeId) => new Promise((resolve) => resolve()),
        reset: () => undefined,
      };
    }}
    useSkills={() => {
      return {
        isLoading: false,
        employees: [],
        addEmployee: (employee) => new Promise((resolve) => resolve("")),
        deleteEmployee: (employeeId) => new Promise((resolve) => resolve()),
        updateEmployee: (employeeId) => new Promise((resolve) => resolve()),
        reset: () => undefined,
      };
    }}*/

  />
);

export const nonEmpty: ComponentStory<typeof Employees> = ({ ...props }) => (
  <Employees
    {...props}
    useEmployees={useEmployees}
    useSkills={useSkills}
  />
);

export const Loading: ComponentStory<any> = ({ ...props }) => (
  <EmployeePageLoadingLayout {...props} />
);
