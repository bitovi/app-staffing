import { ComponentStory, ComponentMeta } from "@storybook/react";

import App from "./App";

export default {
  title: "App",
  component: App,
} as ComponentMeta<typeof App>;

export const Basic: ComponentStory<typeof App> = (args) => <App {...args} />;

Basic.args = {
  name: "World",
};
