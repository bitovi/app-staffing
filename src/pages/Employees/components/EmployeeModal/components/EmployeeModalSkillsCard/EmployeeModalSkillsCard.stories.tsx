import type { ComponentStory, ComponentMeta } from "@storybook/react";
import EmployeeModalSkillsCard from ".";
import "../../../../../../theme/fonts/styles.css";
import { useForm } from "react-hook-form";
import { skills } from "../../../../../../mocks/fixtures";
import { EmployeeFormData } from "../../EmployeeModal";

export default {
  title: "Pages/Employees/EmployeeModal/EmployeeModalSkillsCard",
  component: EmployeeModalSkillsCard,
} as ComponentMeta<typeof EmployeeModalSkillsCard>;

//TODO: Stories not loading after suspense
export const Works: ComponentStory<typeof EmployeeModalSkillsCard> = () => {
  const { control } = useForm<EmployeeFormData>();
  return (
    <EmployeeModalSkillsCard
      control={control}
      setSkills={() => console.log(skills)}
      skills={skills}
    />
  );
};

//TODO: Stories not loading after suspense
export const ServerError: ComponentStory<
  typeof EmployeeModalSkillsCard
> = () => {
  const { control } = useForm<EmployeeFormData>();
  return (
    <EmployeeModalSkillsCard
      control={control}
      setSkills={() => console.log(skills)}
      skills={skills}
    />
  );
};
