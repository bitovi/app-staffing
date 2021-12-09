import { render } from "@testing-library/react";
import ProjectsHeader from "./ProjectsHeader";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../../../../Loading";

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
    const { queryByTestId } = render(
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ProjectsHeader name="Nike Store" />
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
    expect(singleProjectBreadcrumb).toBeInTheDocument();
  });

  it("renders breadcrumbs with the correct link", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ProjectsHeader loading={false} name="Chic-fil-A" />
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
});
