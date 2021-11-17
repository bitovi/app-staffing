import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ProjectCard from "./ProjectCard";
import { projects } from "../../../../../services/api/projects/fixtures";

const project = projects[0];

describe("Components/Layout", () => {
  it("renders project info and view link", () => {
    render(
      <MemoryRouter>
        <ProjectCard key={project.id} project={project} />
      </MemoryRouter>,
    );

    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    expect(screen.getByText("View")).toBeInTheDocument();
  });
});
