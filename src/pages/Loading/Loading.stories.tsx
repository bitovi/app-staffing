import Loading from ".";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Components/Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const loading: ComponentStory<typeof Loading> = () => <Loading />;
