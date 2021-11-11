import type { ComponentStory, ComponentMeta } from "@storybook/react";
import EmployeeModal from ".";
// import { employeeMockData } from "../../services/api/employees/fixtures";
// import { Employees, EmployeePageLoadingLayout } from "./Employees";

export default {
  title: "Pages/Employees/EmployeeModal",
  component: EmployeeModal,
} as ComponentMeta<typeof EmployeeModal>;

export const employeeModal: ComponentStory<typeof EmployeeModal> = ({
  ...props
}) => <EmployeeModal {...props} />;
