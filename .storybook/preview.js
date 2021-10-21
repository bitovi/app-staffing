import { setupWorker } from "msw";
import mocks from "../src/shared/services/mocks";
import theme from "../src/theme/";

export const parameters = {
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
    ? "/app-staffing/storybook"
    : window.location.origin;

setupWorker(...mocks).start({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${pathPrefix}/mockServiceWorker.js`,
  },
});
