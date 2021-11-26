import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { projects } from "../../../../../services/api/projects/fixtures";
import ProjectList from "./ProjectList";

describe("Components/Layout", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <ProjectList projects={projects} />
      </MemoryRouter>,
    );

    const viewCount = screen.getAllByText("View");
    expect(viewCount.length).toEqual(projects.length);
  });

  it("checks if the second project exists", async () => {
    render(
      <MemoryRouter>
        <ProjectList projects={projects} />
      </MemoryRouter>,
    );

    const secondProject = screen.getByText(projects[1].name);
    expect(secondProject).toBeInTheDocument();
  });
});
