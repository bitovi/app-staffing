import { Suspense } from "react";

import theme from "../src/theme/";

import { setupWorker } from "msw";
import mocks, { loadFixtures } from "../src/mocks";


if (!process.env.STORYBOOK_SKIP_MOCKS) {
  loadFixtures();
  
  setupWorker(...mocks).start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
    },
  });
}

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


