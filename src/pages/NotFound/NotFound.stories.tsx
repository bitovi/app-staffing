import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Error from "./NotFound";

export default {
  title: "Pages/Error",
  component: Error,
} as ComponentMeta<typeof Error>;

export const Basic: ComponentStory<typeof Error> = () => <Error />;

Basic.args = {
  name: "World",
};
