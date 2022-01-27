import { Suspense } from "react";

import theme from "../src/theme/";

import "../src/setupMocks";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  chakra: { theme },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  percy: {}
};

const pathPrefix =
  process.env.NODE_ENV === "production" ? "/storybook" : window.location.origin;

export const decorators = [
  (Story) => (
    <Suspense fallback={<h1>Storybook Fallback</h1>}>
      <Story />
    </Suspense>
  ),
];
