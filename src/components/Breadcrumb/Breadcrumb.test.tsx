import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Breadcrumb from ".";

describe("Components/Breadcrumb", () => {
  it("renders breadcrumbs with the correct project name", () => {
    const { queryByText } = render(
      <BrowserRouter>
        <Breadcrumb name="Nike Store" />
      </BrowserRouter>,
    );

    expect(queryByText("Home")).toBeInTheDocument();
    expect(queryByText("Projects")).toBeInTheDocument();
    expect(queryByText("Nike Store")).toBeInTheDocument();
  });

  it("renders breadcrumbs up until a project name", () => {
    const { queryByText } = render(
      <BrowserRouter>
        <Breadcrumb />
      </BrowserRouter>,
    );

    expect(queryByText("Home")).toBeInTheDocument();
    expect(queryByText("Projects")).toBeInTheDocument();
    expect(queryByText("Hilton Hotel")).toBeNull();
  });

  it("renders breadcrumbs with the correct link", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Breadcrumb name="Chic-fil-A" />
      </BrowserRouter>,
    );

    const home = getByText("Home");
    const projects = getByText("Projects");
    const projectName = getByText("Chic-fil-A");

    fireEvent.click(projects);

    expect(home).toBeInTheDocument();
    expect(projects).toBeInTheDocument();
    expect(projectName.closest("a")).toHaveAttribute("href", "/projects");
  });
});
