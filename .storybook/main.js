const path = require("path");

module.exports = {
  core: {
    builder: "storybook-builder-vite",
  },
  framework: "@storybook/react",
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@snek-at/storybook-addon-chakra-ui",
  ],
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(ts|tsx)",
  ],
  async viteFinal(config, { configType }) {
    return {
      ...config,
      resolve: {
        alias: {
          "@staffing": path.resolve(__dirname, "..", "src", "shared"),
        },
      },
      optimizeDeps: {
        include: [
          "@storybook/addon-docs",
        ]
      },
    };
  },
};
