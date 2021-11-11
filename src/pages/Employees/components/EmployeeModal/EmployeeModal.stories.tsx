import type { ComponentStory, ComponentMeta } from "@storybook/react";
import EmployeeModal from ".";
import { skills } from "../../../../services/api/skills/fixtures";
import "../../../../theme/fonts/styles.css";

export default {
  title: "Pages/Employees/EmployeeModal",
  component: EmployeeModal,
} as ComponentMeta<typeof EmployeeModal>;

export const works: ComponentStory<typeof EmployeeModal> = ({ ...props }) => {
  return (
    <EmployeeModal
      onSave={() => new Promise((resolve) => resolve(""))}
      onClose={() => true}
      isOpen={true}
      skills={skills}
      {...props}
    />
  );
};

export const serverError: ComponentStory<typeof EmployeeModal> = ({
  ...props
}) => {
  return (
    <EmployeeModal
      onSave={() => {
        throw new Error("DOES NOT WORK");
      }}
      onClose={() => true}
      isOpen={true}
      skills={skills}
      {...props}
    />
  );
};
