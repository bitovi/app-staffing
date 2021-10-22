import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import { MemoryRouter } from "react-router-dom";

import ProjectCard from "./ProjectCard";
import { projects } from "@staffing/services/api/projects/fixtures";

const project = projects[0];

describe("Components/Layout", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <ProjectCard key={project.id} project={project} />
      </MemoryRouter>,
    );

    const projectContainer = screen.getByTestId("container");
    expect(projectContainer).to.have.tagName("div");

    const projectName = screen.getByText(project.name);
    expect(projectName).to.have.tagName("span");

    const viewProject = screen.getByText(/View/i);
    expect(viewProject).to.have.tagName("A");
  });
});
