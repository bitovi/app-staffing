import { setupWorker } from "msw";
import mocks from "../src/services/mocks";
import theme from "../src/theme/";

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
  process.env.NODE_ENV === "production"
    ? "/storybook"
    : window.location.origin;

setupWorker(...mocks).start({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${pathPrefix}/mockServiceWorker.js`,
  },
});
