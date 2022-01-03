import { render, screen } from "@testing-library/react";
import { StylesProvider } from "@chakra-ui/system";
import { MemoryRouter } from "react-router-dom";

import theme from "../../../../../theme";
import ProjectCard from "./ProjectCard";
import { deserializedProjects } from "../../../../../mocks/projects/fixtures";

const project = deserializedProjects[0];

describe("Components/Layout", () => {
  it("renders project info and view link", () => {
    render(
      <MemoryRouter>
        <StylesProvider value={theme}>
          <ProjectCard key={project.id} project={project} />
        </StylesProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    expect(screen.getByText("View")).toBeInTheDocument();
  });
});
