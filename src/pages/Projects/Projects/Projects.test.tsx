import { render, screen, waitFor, cleanup } from "@testing-library/react";
import Projects from "./Projects";
import { clearFixtures, loadFixtures } from "../../../mocks";
import { MemoryRouter } from "react-router-dom";

describe("Pages/Projects", () => {
  beforeEach(async () => await loadFixtures());
  afterEach(async () => {
    await clearFixtures();
    cleanup();
  });

  it("lazy loads", async () => {
    const { getAllByText } = render(
    <MemoryRouter>
        <Projects />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("loading-projects-skeleton")).toBeInTheDocument();

    const linkElement = await waitFor(() => getAllByText("View Project Detail")[0]);

    expect(linkElement).toBeInTheDocument();
    expect(
      screen.queryByTestId("loading-projects-skeleton"),
    ).not.toBeInTheDocument();
  });
});
