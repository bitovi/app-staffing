import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Loading from "./Loading";

describe("App", () => {
  it("works", () => {
    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>,
    );
  });
});
