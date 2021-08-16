import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
  <StrictMode>
    <App name="World" />
  </StrictMode>,
  document.getElementById("root")
);
