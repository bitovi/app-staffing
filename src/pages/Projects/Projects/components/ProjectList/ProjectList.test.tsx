import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { projects } from "../../../../../mocks/projects/fixtures";
import ProjectList from "./ProjectList";

describe("Pages/Projects/ProjectList", () => {
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
