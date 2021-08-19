import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import App from "./App";

describe("App", () => {
  it("works", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
});
