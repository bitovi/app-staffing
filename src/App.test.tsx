import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import App from "./App";

describe("App", () => {
  it("works", () => {
    render(<App name="World" />);

    const header = screen.getByText(/Hello, World!/i);
    expect(header).to.have.tagName("h1");
  });
});
