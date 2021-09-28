import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tag, TagCloseButton, TagRightIcon } from ".";

export default {
  title: "Components/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

export const Basic: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

Basic.args = {
  children: "Tag",
};

export const WithIcon: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

WithIcon.args = {
  children: "React",
  tagRightIcon: <TagRightIcon>+</TagRightIcon>,
};

export const WithClose: ComponentStory<typeof Tag> = (args) => (
  <Tag {...args}>
    {args.children}
    <TagCloseButton />
  </Tag>
);

WithClose.args = {
  children: "React",
};
