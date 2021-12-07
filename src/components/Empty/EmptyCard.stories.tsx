import type { ComponentStory, ComponentMeta } from "@storybook/react";
import EmptyCard from "./EmptyCard";

export default {
  component: EmptyCard,
  title: "Components/EmptyCard",
} as ComponentMeta<typeof EmptyCard>;

export const Basic: ComponentStory<typeof EmptyCard> = ({ message }) => {
  return <EmptyCard message={message} />;
};

Basic.args = {
  message: "There is nothing here.",
};
