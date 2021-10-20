const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@snek-at/storybook-addon-chakra-ui",
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias["@staffing"] = path.resolve(__dirname, "..", "src", "shared");

    return config;
  },
};
