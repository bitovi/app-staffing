import { ComponentMeta, ComponentStory } from "@storybook/react";
import ToastBox from "./Toast";

export default {
  title: "Components/Toast",
  component: ToastBox,
} as ComponentMeta<typeof ToastBox>;

export const SuccessToast: ComponentStory<typeof ToastBox> = ({
  title,
  description,
}) => {
  return <ToastBox title={title} description={description} />;
};

SuccessToast.args = {
  title: "Team member added",
  description: "Sam Krieger was successfully added!",
};

export const ErrorToast: ComponentStory<typeof ToastBox> = ({
  title,
  description,
}) => {
  return <ToastBox title={title} description={description} status="error" />;
};

ErrorToast.args = {
  title: "Team member added",
  description: "Sam Krieger was successfully added!",
};

export const LongToast: ComponentStory<typeof ToastBox> = ({
  title,
  description,
}) => {
  return (
    <ToastBox
      title={title}
      description={description}
      duration={10000}
      isClosable
    />
  );
};

LongToast.args = {
  title: "Long toast",
  description: "But you can close it any time!",
};
