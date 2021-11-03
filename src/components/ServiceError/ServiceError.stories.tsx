import type { ComponentStory, ComponentMeta } from "@storybook/react";
import ServiceError from "./ServiceError";

export default {
  title: "Components/ServiceError",
  component: ServiceError,
} as ComponentMeta<typeof ServiceError>;

const Template: ComponentStory<typeof ServiceError> = (args) => (
  <ServiceError name={args.name} message={args.message} />
);

export const Basic = Template.bind({});
Basic.args = {
  name: "",
  message: "",
};
