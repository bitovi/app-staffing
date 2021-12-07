import { render } from "react-dom";
import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import { setupWorker } from "msw";
import { ChakraProvider } from "@chakra-ui/react";

import mocks from "./services/mocks";

import App from "./App";
import theme from "./theme";

// fonts
import "./theme/fonts/styles.css";

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

// Commented out for potentialy causing production errors?
// function localStorageProvider() {
//   const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));
//   window.addEventListener("beforeunload", () => {
//     const appCache = JSON.stringify(Array.from(map.entries()));
//     localStorage.setItem("app-cache", appCache);
//   });
//   return map;
// }
render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <HashRouter>
        {/* <SWRConfig value={{ provider: localStorageProvider }}> */}
        <App />
        {/* </SWRConfig> */}
      </HashRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root"),
);
