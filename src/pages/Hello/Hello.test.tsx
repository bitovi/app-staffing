import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import Hello from "./Hello";

jest.mock("../../services/api");

describe("Pages/Hello", () => {
  it("works", async () => {
    render(<Hello name="World" />);

    expect(screen.getByText(/Hello, World!/i)).to.have.tagName("h1");
  });
});
