import { render } from "react-dom";
import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import { setupWorker } from "msw";
import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/inter";
import "@fontsource/montserrat";

import mocks from "./services/mocks";

import App from "./App";
import theme from "./theme";

if (process.env.PUBLIC_URL) {
  if (!window.location.pathname.startsWith(`${process.env.PUBLIC_URL}/`)) {
    window.location.pathname = `${process.env.PUBLIC_URL}/`;
  }
}

setupWorker(...mocks).start({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
});

render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root"),
);
