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
      toastTitle={"New team member"}
      onSave={() => Promise.resolve("")}
      onClose={() => true}
      isOpen={true}
      skills={skills}
    />
  );
};

export const serverError: ComponentStory<typeof EmployeeModal> = () => {
  return (
    <EmployeeModal
      toastTitle={"New team member"}
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
  const { employees } = employeeMockData();

  return (
    <EmployeeModal
      toastTitle={"Team member updated"}
      onSave={() => Promise.resolve("")}
      onClose={() => true}
      isOpen={true}
      skills={skills}
      employee={employees && employees[0]}
    />
  );
};

export const savePending: ComponentStory<typeof EmployeeModal> = () => {
  return (
    <EmployeeModal
      toastTitle={"New team member"}
      onSave={() => new Promise(() => true)}
      onClose={() => true}
      isOpen={true}
      skills={skills}
    />
  );
};
