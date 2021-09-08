import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import ProjectDetail from "./ProjectDetail";

describe("Components/Layout", () => {
  it("works", () => {
    render(
      <MemoryRouter initialEntries={["/project/100"]}>
        <ProjectDetail />
      </MemoryRouter>,
    );
  });
});
