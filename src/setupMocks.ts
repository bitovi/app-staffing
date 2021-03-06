import { setupWorker } from "msw";
import mocks, { loadFixtures } from "./mocks";

loadFixtures();

setupWorker(...mocks).start({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
});
