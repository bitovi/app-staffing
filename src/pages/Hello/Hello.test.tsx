import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import Hello from "./Hello";

describe("Pages/Hello", () => {
  it("works", () => {
    render(<Hello name="World" />);

    const header = screen.getByText(/Hello, World!/i);
    expect(header).to.have.tagName("h1");
  });
});
