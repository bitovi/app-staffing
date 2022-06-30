import type { ComponentStory, ComponentMeta } from "@storybook/react";
import EmployeeModal from ".";
import { useEmployees } from "../../../../services/api";
import "../../../../theme/fonts/styles.css";

export default {
  title: "Pages/Employees/EmployeeModal",
  component: EmployeeModal,
} as ComponentMeta<typeof EmployeeModal>;

//TODO: Skills not resolving after suspense
export const Works: ComponentStory<typeof EmployeeModal> = () => {
  return (
    <EmployeeModal
      onSave={() => Promise.resolve()}
      onClose={() => true}
      isOpen={true}
    />
  );
};

export const ServerError: ComponentStory<typeof EmployeeModal> = () => {
  return (
    <EmployeeModal
      onSave={() => {
        throw new Error("DOES NOT WORK");
      }}
      onClose={() => true}
      isOpen={true}
    />
  );
};

export const EditEmployee: ComponentStory<typeof EmployeeModal> = () => {
  const employees = useEmployees();

  return (
    <EmployeeModal
      onSave={() => Promise.resolve()}
      onClose={() => true}
      isOpen={true}
      employee={employees && employees[0]}
    />
  );
};

export const SavePending: ComponentStory<typeof EmployeeModal> = () => {
  return (
    <EmployeeModal
      onSave={() => new Promise(() => true)}
      onClose={() => true}
      isOpen
    />
  );
};
