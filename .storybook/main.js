module.exports = {
  framework: "@storybook/react",
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@snek-at/storybook-addon-chakra-ui",
  ],
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(ts|tsx)",
  ],
  refs: {
    '@chakra-ui/react': {
      disable: true
    }
  }
};
