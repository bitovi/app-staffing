import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from ".";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Basic: ComponentStory<typeof Button> = (args) => (
  <Button {...args} onClick={() => alert("clicked")} />
);

Basic.args = {
  children: "Click me",
};

export const Link: ComponentStory<typeof Button> = (args) => (
  <Button {...args} onClick={() => alert("clicked link variant")} />
);

Link.args = {
  children: "Click me",
  variant: "link",
};
