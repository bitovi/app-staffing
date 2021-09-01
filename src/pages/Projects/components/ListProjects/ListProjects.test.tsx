import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import { MemoryRouter } from "react-router-dom";

import ListProjects from "./ListProjects";
import { projects } from "../../../../services/api/fixtures";

describe("Components/Layout", () => {
  it("works", () => {
    render(
      <MemoryRouter>
        <ListProjects
          projects={projects}
          onView={(p) => null}
          onAddNew={() => null}
        />
      </MemoryRouter>,
    );

    const projectContainer = screen.getByText(/Add Project/i);
    expect(projectContainer).to.have.tagName("button");
  });
});
