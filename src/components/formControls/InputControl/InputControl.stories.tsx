import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputControl } from ".";

export default {
  title: "Components/Form/InputControl",
  component: InputControl,
} as ComponentMeta<typeof InputControl>;

export const Basic: ComponentStory<typeof InputControl> = (props) => {
  return (
    <>
      <InputControl {...props} />
    </>
  );
};

Basic.args = {
  label: "Name",
  formControlProps: {
    isRequired: true,
    error: "",
  },
  formHelperText: "Please type something above",
};
