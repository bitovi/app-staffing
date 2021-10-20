import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Error from "./Error";

export default {
  title: "Pages/Error",
  component: Error,
} as ComponentMeta<typeof Error>;

export const Basic: ComponentStory<typeof Error> = ({ ...props }) => (
  <Error {...props} />
);
