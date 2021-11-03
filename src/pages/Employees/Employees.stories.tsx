import type { ComponentStory, ComponentMeta } from "@storybook/react";
// import { employees } from "../../services/api/employees/fixtures";
import { Employees, EmployeePageLoadingLayout } from "./Employees";

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
        addEmployee: (_employee) => new Promise((resolve):void => resolve('')),
        deleteEmployee: (_employee) => new Promise((resolve):void => resolve()),
        updateEmployee: (_employee) => new Promise((resolve):void => resolve()),
        reset: () => undefined,
      };
    }}
    useSkills={() => {
      return {
        isLoading: false,
        employees: [],
        addEmployee: (_employee: any) => new Promise((resolve):void => resolve('')),
        //deleteEmployee: (): void => new Promise((resolve):void => resolve()),
        //updateEmployee: (): void => new Promise((resolve):void => resolve()),
        //reset: () => undefined,
      };
    }}
  />
);

// export const nonEmpty: ComponentStory<typeof Employees> = ({ ...props }) => (
//   <Employees
//     {...props}
//     useEmployees={() => {
//       return {
//         isLoading: false,
//         employees: employees,
//         addEmployee: (employee) => new Promise((resolve) => resolve("")),
//         deleteEmployee: (employeeId) => new Promise((resolve) => resolve()),
//         updateEmployee: (employeeId) => new Promise((resolve) => resolve()),
//         reset: () => undefined,
//       };
//     }}
//   />
// );

export const Loading: ComponentStory<any> = ({ ...props }) => (
  <EmployeePageLoadingLayout {...props} />
);
