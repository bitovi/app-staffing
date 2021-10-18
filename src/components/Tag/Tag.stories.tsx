import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tag, TagCloseButton, TagRightIcon } from ".";

export default {
  title: "Components/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

export const Basic: ComponentStory<typeof Tag> = ({ ...props }) => (
  <Tag {...props} />
);

Basic.args = {
  children: "Tag",
};

export const WithIcon: ComponentStory<typeof Tag> = ({ ...props }) => (
  <Tag {...props} />
);

WithIcon.args = {
  children: "React",
  tagRightIcon: <TagRightIcon>+</TagRightIcon>,
};

export const WithClose: ComponentStory<typeof Tag> = ({
  children,
  ...props
}) => (
  <Tag {...props}>
    {children}
    <TagCloseButton />
  </Tag>
);

WithClose.args = {
  children: "React",
};
