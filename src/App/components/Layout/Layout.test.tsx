import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import { MemoryRouter } from "react-router-dom";

import Layout from "./Layout";

describe("Components/Layout", () => {
  it("works", () => {
    render(
      <MemoryRouter>
        <Layout>Hello!</Layout>
      </MemoryRouter>,
    );

    const header = screen.getByText(/Hello!/i);
    expect(header).to.have.tagName("div");
  });
});
