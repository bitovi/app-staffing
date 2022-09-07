import { render, screen, waitFor } from "@testing-library/react";
import Projects from "./Projects";
import { MemoryRouter } from "react-router-dom";

describe("Pages/Projects", () => {
  it("lazy loads", async () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("loading-projects-skeleton")).toBeInTheDocument();

    const linkElement = await waitFor(
      () => getAllByText("View Project Detail")[0],
    );

    expect(linkElement).toBeInTheDocument();
    expect(
      screen.queryByTestId("loading-projects-skeleton"),
    ).not.toBeInTheDocument();
  });
});
