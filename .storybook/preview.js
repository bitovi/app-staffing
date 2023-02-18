import { Suspense } from "react";
import { StylesProvider } from "@chakra-ui/react";
import { initialize, mswDecorator } from "msw-storybook-addon";

import theme from "../src/theme/";

import "../src/setupMocks";

// Initialize MSW
initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  chakra: { theme },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const pathPrefix =
  process.env.NODE_ENV === "production" ? "/storybook" : window.location.origin;

export const decorators = [
  (Story) => (
    <StylesProvider value={theme}>
      <Suspense fallback={<h1>Storybook Fallback</h1>}>
        <Story />
      </Suspense>
    </StylesProvider>
  ),
  mswDecorator,
];
