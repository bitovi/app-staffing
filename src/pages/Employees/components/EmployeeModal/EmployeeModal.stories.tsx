import type { ComponentStory, ComponentMeta } from "@storybook/react";
import EmployeeModal from ".";
import { skills } from "../../../../services/api/skills/fixtures";
import { employeeMockData } from "../../../../services/api/employees/fixtures";
import "../../../../theme/fonts/styles.css";

export default {
  title: "Pages/Employees/EmployeeModal",
  component: EmployeeModal,
} as ComponentMeta<typeof EmployeeModal>;

export const works: ComponentStory<typeof EmployeeModal> = () => {
  return (
    <EmployeeModal
      onSave={() => Promise.resolve()}
      onClose={() => true}
      isOpen={true}
      skills={skills}
    />
  );
};

export const serverError: ComponentStory<typeof EmployeeModal> = () => {
  return (
    <EmployeeModal
      onSave={() => {
        throw new Error("DOES NOT WORK");
      }}
      onClose={() => true}
      isOpen={true}
      skills={skills}
    />
  );
};

export const EditEmployee: ComponentStory<typeof EmployeeModal> = () => {
  const { getEmployeeList } = employeeMockData();
  const { data: employees } = getEmployeeList();

  return (
    <EmployeeModal
      onSave={() => Promise.resolve()}
      onClose={() => true}
      isOpen={true}
      skills={skills}
      employee={employees && employees[0]}
    />
  );
};
