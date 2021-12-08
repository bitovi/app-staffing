import { render, screen } from "@testing-library/react";
import ProjectsHeader from "./ProjectsHeader";

describe("Components/Projects/ProjectsHeader", () => {
  it("renders title, breadcrumbs, and button", () => {
    render(<ProjectsHeader />);

    const [title, secondBreadcrumb] = screen.getAllByText("Projects");
    const firstBreadcrumb = screen.getByText("Home");

    expect(title).toBeVisible();
    expect(firstBreadcrumb).toBeVisible();
    expect(secondBreadcrumb).toBeVisible();
  });
});
