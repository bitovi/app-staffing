import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import { MemoryRouter } from "react-router-dom";

import ProjectDetail from "./ProjectDetail";

describe("Components/Layout", () => {
  it("works", () => {
    render(
      <MemoryRouter initialEntries={["/project/100"]}>
        <ProjectDetail />
      </MemoryRouter>,
    );

    // const projectContainer = screen.getByText(/Delete/i);
    // expect(projectContainer).to.have.tagName("button");
  });
});
