import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TextArea } from ".";

export default {
  title: "Components/Form/TextArea",
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

export const Basic: ComponentStory<typeof TextArea> = (props) => {
  return (
    <>
      <TextArea {...props} />
    </>
  );
};

Basic.args = {
  label: "Description",
  formControlProps: {
    isRequired: true,
    error: "",
  },
  formHelperText: "Please type something above",
};
