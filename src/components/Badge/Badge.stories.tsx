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
  <Badge {...props}>
    Project Management. Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industrys standard dummy text
    ever since the 1500s
  </Badge>
);

SmallLongText.args = {
  size: "sm",
  isTruncated: false,
  textAlign: "center",
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
