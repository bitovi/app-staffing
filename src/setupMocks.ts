import { setupWorker } from "msw";
import mocks from "./services/mocks";

setupWorker(...mocks).start({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
});
