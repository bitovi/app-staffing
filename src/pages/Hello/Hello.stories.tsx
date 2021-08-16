import { ComponentStory, ComponentMeta } from "@storybook/react";

import Hello from "./Hello";

export default {
  title: "Pages/Hello",
  component: Hello,
} as ComponentMeta<typeof Hello>;

export const Basic: ComponentStory<typeof Hello> = (args) => (
  <Hello {...args} />
);

Basic.args = {
  name: "World",
};
