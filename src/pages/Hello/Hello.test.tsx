import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import Hello from "./Hello";

jest.mock("../../services/api");

describe("Pages/Hello", () => {
  it("works", async () => {
    render(<Hello name="World" />);

    expect(screen.getByText(/Hello, World!/i)).to.have.tagName("h1");

    await screen.findByText(/car/i);

    expect(screen.getByText(/car/i)).to.have.tagName("li");
    expect(screen.getByText(/cam/i)).to.have.tagName("li");
    expect(screen.getByText(/caz/i)).to.have.tagName("li");
  });
});
