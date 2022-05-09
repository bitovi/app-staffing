import { ComponentStory, ComponentMeta } from "@storybook/react";
import Badge from "./Badge";

export default {
  title: "Components/Badge",
  component: Badge,
} as ComponentMeta<typeof Badge>;

export const Small: ComponentStory<typeof Badge> = ({ ...props }) => (
  <Badge {...props}>Small</Badge>
);

Small.args = {
  size: "sm",
};

export const SmallLongText: ComponentStory<typeof Badge> = ({ ...props }) => (
  <Badge {...props}>Small With a lot of Text. Project Management</Badge>
);

SmallLongText.args = {
  size: "sm",
  isTruncated: false
};

export const SmallLongText80px: ComponentStory<typeof Badge> = ({ ...props }) => (
  <Badge {...props}>Small With a lot of Text. Project Management</Badge>
);

SmallLongText80px.args = {
  size: "sm",
  isTruncated: false,
  maxWidth:'80px'
};

export const Medium: ComponentStory<typeof Badge> = ({ ...props }) => (
  <Badge {...props}>Medium</Badge>
);

Medium.args = {
  size: "md",
};

export const Large: ComponentStory<typeof Badge> = ({ ...props }) => (
  <Badge {...props}>Large</Badge>
);

Large.args = {
  size: "lg",
};
