import { addDecorator } from "@storybook/react";

import { setupWorker } from "msw";
import mocks from "../src/services/mocks";
import theme from "../src/theme/";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  chakra: { theme },
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
