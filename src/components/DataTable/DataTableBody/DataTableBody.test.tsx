import { render, screen } from "@testing-library/react";
import { StylesProvider } from "@chakra-ui/system";
import { MemoryRouter } from "react-router-dom";
import { projects } from "../../../mocks/fixtures";
import theme from "../../../theme";
import DataTableBody from ".";

const project = projects[0];

describe("Components/Layout", () => {
  it("renders project info and view link", () => {
    render(
      <MemoryRouter>
        <StylesProvider value={theme}>
          <DataTableBody key={project.id} project={project} />
        </StylesProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getAllByText("View Project Detail")[0]).toBeInTheDocument();
  });
});
