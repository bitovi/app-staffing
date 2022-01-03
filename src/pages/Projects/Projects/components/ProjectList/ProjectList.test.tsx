import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { deserializedProjects } from "../../../../../mocks/projects/fixtures";
import ProjectList from "./ProjectList";

describe("Pages/Projects/ProjectList", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <ProjectList projects={deserializedProjects} />
      </MemoryRouter>,
    );

    const viewCount = screen.getAllByText("View");
    expect(viewCount.length).toEqual(deserializedProjects.length);
  });

  it("checks if the second project exists", async () => {
    render(
      <MemoryRouter>
        <ProjectList projects={deserializedProjects} />
      </MemoryRouter>,
    );

    const secondProject = screen.getByText(deserializedProjects[1].name);
    expect(secondProject).toBeInTheDocument();
  });
});
