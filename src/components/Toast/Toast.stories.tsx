import { ComponentMeta, ComponentStory } from "@storybook/react";
import ToastBox from "./Toast";

export default {
  title: "Components/Toast",
  component: ToastBox,
} as ComponentMeta<typeof ToastBox>;

export const Toast: ComponentStory<typeof ToastBox> = ({
  title,
  description,
}) => {
  return <ToastBox title={title} description={description} />;
};

Toast.args = {
  title: "Team member added",
  description: "Sam Krieger was successfully added!",
};
