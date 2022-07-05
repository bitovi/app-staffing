import { ComponentStory, ComponentMeta } from "@storybook/react";
import AlertBar from "./AlertBar";

export default {
  title: "Components/AlertBar",
  component: AlertBar,
} as ComponentMeta<typeof AlertBar>;

export const Default: ComponentStory<typeof AlertBar> = ({ ...props }) => (
  <AlertBar {...props} />
);

Default.args = {
  title: "This is a title",
  description: "This is a description",
};
