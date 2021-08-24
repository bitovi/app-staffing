import { addDecorator } from "@storybook/react";

import { setupWorker } from "msw";
import mocks from "../src/services/mocks";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

const pathPrefix = process.env.NODE_ENV === 'production'
  ? '/app-staffing/storybook'
  : '/'

setupWorker(...mocks).start({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${pathPrefix}/mockServiceWorker.js`,
  },
});
