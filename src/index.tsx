import { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { setupWorker } from "msw";
import { ChakraProvider } from "@chakra-ui/react";

import mocks from "./services/mocks";

import App from "./App";
import theme from "./theme";

// fonts
import "./theme/fonts/styles.css";

setupWorker(...mocks).start({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
});

// Causing production errors?
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
      <BrowserRouter>
        {/* <SWRConfig value={{ provider: localStorageProvider }}> */}
        <App />
        {/* </SWRConfig> */}
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root"),
);
