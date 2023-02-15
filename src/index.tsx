import { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import theme from "./theme";

// Remember to disable mocks before creating a pull request
// import "./setupMocks";
import "./theme/fonts/styles.css";

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
