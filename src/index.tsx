import { render } from "react-dom";
import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";

import mocks from "./services/mocks";

import App from "./App";

if (process.env.PUBLIC_URL) {
  if (!window.location.pathname.startsWith(`${process.env.PUBLIC_URL}/`)) {
    window.location.pathname = `${process.env.PUBLIC_URL}/`;
  }
}

mocks.start({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
});

render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
  document.getElementById("root"),
);
