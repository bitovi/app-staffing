import { render, screen } from "@testing-library/react";
import { projectStoreManager } from "../../../services/api/projects/mocks";
import Projects from "./Projects";

describe("Pages/Projects", () => {
  beforeEach(async () => await projectStoreManager.load());
  afterEach(async () => await projectStoreManager.clear());

  it("displays the header", async () => {
    render(
      <Projects
        useProjects={() => ({
          isLoading: true,
          error: undefined,
          addProject: () => Promise.resolve(""),
          updateProject: () => Promise.resolve(),
          deleteProject: () => Promise.resolve(),
          reset: () => undefined,
        })}
      />,
    );
    expect(await screen.findByText("Projects")).toBeInTheDocument();
    expect(await screen.findByText("Add Project")).toBeInTheDocument();
  });

  it("displays loading component while fetching projects from api", () => {
    render(
      <Projects
        useProjects={() => ({
          isLoading: true,
          error: undefined,
          addProject: () => Promise.resolve(""),
          updateProject: () => Promise.resolve(),
          deleteProject: () => Promise.resolve(),
          reset: () => undefined,
        })}
      />,
    );
    expect(screen.getByTestId("loading-projects-skeleton")).toBeInTheDocument();
  });

  it("displays error component after api error", async () => {
    render(
      <Projects
        useProjects={() => ({
          isLoading: false,
          error: { name: "err", message: "msg" },
          addProject: () => Promise.resolve(""),
          updateProject: () => Promise.resolve(),
          deleteProject: () => Promise.resolve(),
          reset: () => undefined,
        })}
      />,
    );
    expect(await screen.findByText("Service Error")).toBeInTheDocument();
  });
});
