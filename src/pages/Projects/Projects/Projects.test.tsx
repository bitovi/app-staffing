import { render, screen } from "@testing-library/react";
import projectStoreManager from "../../../services/api/mocks/projects/mocks";
import Projects from "./Projects";
import Loading from "../../Loading";
import { Suspense } from "react";

describe("Pages/Projects", () => {
  beforeEach(async () => await projectStoreManager.load());
  afterEach(async () => await projectStoreManager.clear());

  it("displays loading component while fetching projects from api", () => {
    render(
      <Suspense fallback={<Loading />}>
        <Projects
          useProjects={() => ({
            isLoading: true,
            error: undefined,
            addProject: () => Promise.resolve(""),
            updateProject: () => Promise.resolve(),
            deleteProject: () => Promise.resolve(),
            reset: () => undefined,
          })}
        />
      </Suspense>,
    );
    expect(screen.getByTestId("loading-projects-skeleton")).toBeInTheDocument();
  });

  it("displays error component after api error", async () => {
    render(
      <Suspense fallback={<Loading />}>
        <Projects
          useProjects={() => ({
            isLoading: false,
            error: { name: "err", message: "msg" },
            addProject: () => Promise.resolve(""),
            updateProject: () => Promise.resolve(),
            deleteProject: () => Promise.resolve(),
            reset: () => undefined,
          })}
        />
      </Suspense>,
    );
    expect(await screen.findByText("Service Error")).toBeInTheDocument();
  });
});
