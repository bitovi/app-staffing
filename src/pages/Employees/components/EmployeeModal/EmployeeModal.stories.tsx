import type { ComponentStory, ComponentMeta } from "@storybook/react";
import EmployeeModal from ".";
import { skills } from "../../../../services/api/mocks/skills/fixtures";
import { employeeMockData } from "../../../../services/api/mocks/employees/fixtures";
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
  const { useEmployeeList } = employeeMockData();
  const { data: employees } = useEmployeeList({ include: "skills" });

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

export const savePending: ComponentStory<typeof EmployeeModal> = () => {
  return (
    <EmployeeModal
      onSave={() => new Promise(() => true)}
      onClose={() => true}
      isOpen={true}
      skills={skills}
    />
  );
};
