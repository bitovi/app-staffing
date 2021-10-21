import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import { MemoryRouter } from "react-router-dom";

import ProjectDetail from "./ProjectDetail";
import { projects } from "@staffing/services/api/projects/fixtures";

const project = projects[0];

describe("Components/Layout", () => {
  it("works", () => {
    render(
      <MemoryRouter>
        <ProjectDetail
          key={project.id}
          project={project}
          onCancel={() => null}
          onSave={(p) => null}
        />
      </MemoryRouter>,
    );

    const projectContainer = screen.getByText(/Cancel/i);
    expect(projectContainer).to.have.tagName("button");
  });
});
