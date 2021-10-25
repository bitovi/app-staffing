import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Link from ".";

export default {
  title: "Components/Link",
  component: Link,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Link>;

export const Basic: ComponentStory<typeof Link> = ({ ...props }) => (
  <Link {...props} />
);

Basic.args = {
  children: "View",
  to: "/Home",
};
