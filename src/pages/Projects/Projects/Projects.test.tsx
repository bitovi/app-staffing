import { render, screen } from "@testing-library/react";
import { projectStoreManager } from "../../../services/api/projects/mocks";
import { mockLoadingProjectsHook } from "../../../services/api/useProjects/mocks";
import Projects from "./Projects";

describe("Pages/Projects", () => {
  beforeEach(async () => await projectStoreManager.loadResources());
  afterEach(async () => await projectStoreManager.clearResources());

  it("displays skeleton components while fetching projects from api", () => {
    render(<Projects useProjects={mockLoadingProjectsHook} />);
    expect(screen.getByTestId("projects-loading-skeleton")).toBeInTheDocument();
  });
});
