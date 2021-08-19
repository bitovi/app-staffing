import { addDecorator } from '@storybook/react'

import { setupWorker } from "msw";
import mocks from "../src/services/mocks";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

setupWorker(...mocks).start({
  onUnhandledRequest: "bypass",
  // serviceWorker: {
  //   url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  // },
});
