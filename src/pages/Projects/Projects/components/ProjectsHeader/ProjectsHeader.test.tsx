import { render } from "@testing-library/react";
import ProjectsHeader from "./ProjectsHeader";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../../../../Loading";
import { projects } from "../../../../../mocks/fixtures";

describe("Components/Projects/ProjectsHeader", () => {
  it("renders with breadcrumbs up until a project name", () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ProjectsHeader />
        </Suspense>
      </BrowserRouter>,
    );

    const homeBreadcrumb = queryByTestId("homeBreadcrumb");
    const projectsBreadcrumb = queryByTestId("projectsBreadcrumb");
    const projectListTitle = queryByTestId("projectListTitle");
    const singleProjectBreadcrumb = queryByTestId("singleProjectBreadcrumb");

    expect(homeBreadcrumb).toBeInTheDocument();
    expect(projectsBreadcrumb).toBeInTheDocument();
    expect(projectListTitle).toBeInTheDocument();
    expect(singleProjectBreadcrumb).toBeNull();
  });

  it("renders breadcrumbs with the correct project name", () => {
    const project = projects[0];
    const { queryByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ProjectsHeader project={project} />
        </Suspense>
      </BrowserRouter>,
    );

    const homeBreadcrumb = queryByTestId("homeBreadcrumb");
    const projectsBreadcrumb = queryByTestId("projectsBreadcrumb");
    const projectListTitle = queryByTestId("projectListTitle");
    const singleProjectBreadcrumb = queryByTestId("singleProjectBreadcrumb");

    expect(homeBreadcrumb).toBeInTheDocument();
    expect(projectsBreadcrumb).toBeInTheDocument();
    expect(projectListTitle).toBeInTheDocument();
    expect(singleProjectBreadcrumb?.innerHTML).toBe("Dynamic Investor Configuration Agents");
  });

  it("renders breadcrumbs with the correct link", async () => {
    const project = projects[0];
    const { getByTestId } = render(
      <BrowserRouter>
        <ProjectsHeader loading={false} project={project} />
      </BrowserRouter>,
    );

    const projectsBreadcrumb = getByTestId("projectsBreadcrumb");
    const singleProjectBreadcrumb = getByTestId("singleProjectBreadcrumb");

    expect(projectsBreadcrumb.closest("a")).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(singleProjectBreadcrumb.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders h1 tag for page title", () => {
    const project = projects[0];
    const { getByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ProjectsHeader project={project} />
        </Suspense>
      </BrowserRouter>,
    );

    const pageTitle = getByTestId("projectListTitle");

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle?.tagName).toBe("H1");
    expect(pageTitle?.innerHTML).toBe("Dynamic Investor Configuration Agents");
  });
});
