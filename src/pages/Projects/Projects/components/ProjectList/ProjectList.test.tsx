import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { projects } from "@staffing/services/api/projects/fixtures";
import ProjectList from "./ProjectList";

describe("Components/Layout", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <ProjectList projects={projects} onAddNew={() => null} />
      </MemoryRouter>,
    );

    const projectContainer = screen.getByText(/Add Project/i);
    expect(projectContainer.tagName).toBe("BUTTON");
    const viewCount = screen.getAllByText("View");
    expect(viewCount.length).toEqual(projects.length);
  });

  it("calls 'onAddNew' on button click", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <ProjectList projects={projects} onAddNew={onClick} />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(/Add Project/i));
    expect(onClick).toHaveBeenCalled();
  });
  it("checks if the second project exists", async () => {
    render(
      <MemoryRouter>
        <ProjectList projects={projects} onAddNew={() => null} />
      </MemoryRouter>,
    );

    const secondProject = screen.getByText(projects[1].name);
    expect(secondProject).toBeInTheDocument();
  });
});
