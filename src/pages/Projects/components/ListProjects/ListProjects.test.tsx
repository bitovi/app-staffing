import { render, screen, fireEvent } from "@testing-library/react";
import { expect, spy } from "chai";

import { MemoryRouter } from "react-router-dom";

import ListProjects from "./ListProjects";
import { projects } from "../../../../services/api/projects/fixtures";

describe("Components/Layout", () => {
  it("renders", () => {
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

  it("calls 'onAddNew' on button click", () => {
    const onClick = spy();

    const { getByText } = render(
      <MemoryRouter>
        <ListProjects
          projects={projects}
          onView={(p) => null}
          onAddNew={onClick}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText(/Add Project/i));
    expect(onClick).to.have.been.called();
  });

  it("has as many ProjectCards as projects", async () => {
    const { findAllByText } = render(
      <MemoryRouter>
        <ListProjects
          projects={projects}
          onView={(p) => null}
          onAddNew={() => null}
        />
      </MemoryRouter>
    );

    const projectCards = await findAllByText(/Project:/i);
    expect(projectCards.length).to.be.equal(projects.length);
  });
});
