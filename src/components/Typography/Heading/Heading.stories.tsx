import { ComponentMeta, ComponentStory } from "@storybook/react";
import Heading from "./Heading";

export default {
  title: "Components/Typography/Heading",
  component: Heading,
} as ComponentMeta<typeof Heading>;

export const H1: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args}>Heading 1</Heading>
);

H1.args = {
  variant: "h1",
};

export const H2: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args}>Heading 2</Heading>
);

H2.args = {
  variant: "h2",
};
