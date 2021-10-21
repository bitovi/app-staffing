import { render, screen } from "@testing-library/react";
import { Project, ProjectActions } from "../../../services/api";
import { projectStoreManager } from "../../../services/api/projects/mocks";
import { QueriableList, ResponseStatus } from "../../../services/api/shared";
import Projects from "./Projects";

describe("Pages/Projects", () => {
  beforeEach(async () => await projectStoreManager.loadResources());
  afterEach((async () => await projectStoreManager.clearResources()));

  it("displays skeleton components while fetching projects from api", () => {

    const mockLoadingProjectsHook: (queryParams?: QueriableList<Project> | undefined) => ResponseStatus & ProjectActions = () => {
      return {
        projects: [],
        isLoading: true,
        error: undefined,
        addProject: () => Promise.resolve("new id"),
        updateProject: () => Promise.resolve()
      }
    };

    render(<Projects useProjects={mockLoadingProjectsHook} />);

    expect(screen.getByTestId("projects-loading-skeleton")).toBeInTheDocument();
  });

});
