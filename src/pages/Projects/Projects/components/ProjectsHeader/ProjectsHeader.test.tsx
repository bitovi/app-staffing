import { render, screen } from "@testing-library/react";
import ProjectsHeader from "./ProjectsHeader";
import { BrowserRouter } from "react-router-dom";

describe("Components/Projects/ProjectsHeader", () => {
  it("renders title, breadcrumbs, and button", () => {
    render(<ProjectsHeader />);

    const [title, secondBreadcrumb] = screen.getAllByText("Projects");
    const firstBreadcrumb = screen.getByText("Home");

    expect(title).toBeVisible();
    expect(firstBreadcrumb).toBeVisible();
    expect(secondBreadcrumb).toBeVisible();
  });

  it("renders breadcrumbs up until a project name", () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <ProjectsHeader />
      </BrowserRouter>,
    );

    const projectName = queryByTestId("project");

    expect(queryByTestId("home")).toBeInTheDocument();
    expect(queryByTestId("projects")).toBeInTheDocument();
    expect(projectName).toBeNull();
  });

  it("renders breadcrumbs with the correct project name", () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <ProjectsHeader name="Nike Store" />
      </BrowserRouter>,
    );

    expect(queryByTestId("home")).toBeInTheDocument();
    expect(queryByTestId("projects")).toBeInTheDocument();
    expect(queryByTestId("project")).toBeInTheDocument();
  });

  it("renders breadcrumbs with the correct link", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ProjectsHeader loading={false} name="Chic-fil-A" />
      </BrowserRouter>,
    );

    const projects = getByTestId("projects");
    const projectName = getByTestId("project");

    expect(projects.closest("a")).toHaveAttribute("href", "/projects");
    expect(projectName.closest("a")).toHaveAttribute("href", "/");
  });
});
