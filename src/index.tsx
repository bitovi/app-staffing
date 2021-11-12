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

render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root"),
);
