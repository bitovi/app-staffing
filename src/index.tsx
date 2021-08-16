import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";

import App from "./App";

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
  document.getElementById("root"),
);
