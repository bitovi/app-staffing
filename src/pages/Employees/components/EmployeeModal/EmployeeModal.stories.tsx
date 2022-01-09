import type { ComponentStory, ComponentMeta } from "@storybook/react";
import EmployeeModal from ".";
import { useEmployees, useSkills } from "../../../../services/api";
import "../../../../theme/fonts/styles.css";

export default {
  title: "Pages/Employees/EmployeeModal",
  component: EmployeeModal,
} as ComponentMeta<typeof EmployeeModal>;

export const Works: ComponentStory<typeof EmployeeModal> = () => {
  const skills = useSkills();

  return (
    <EmployeeModal
      onSave={() => Promise.resolve()}
      onClose={() => true}
      isOpen={true}
      skills={skills}
    />
  );
};

export const ServerError: ComponentStory<typeof EmployeeModal> = () => {
  const skills = useSkills();

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
  const employees = useEmployees();
  const skills = useSkills();

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

export const SavePending: ComponentStory<typeof EmployeeModal> = () => {
  const skills = useSkills();

  return (
    <EmployeeModal
      onSave={() => new Promise(() => true)}
      onClose={() => true}
      isOpen
      skills={skills}
    />
  );
};
