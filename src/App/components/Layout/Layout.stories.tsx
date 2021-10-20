import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { MemoryRouter } from "react-router-dom";

import Layout from "./Layout";

export default {
  title: "Components/Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

export const Basic: ComponentStory<typeof Layout> = ({ ...props }) => (
  <MemoryRouter>
    <Layout {...props} />
  </MemoryRouter>
);

Basic.args = {
  children: "Hello!",
};
