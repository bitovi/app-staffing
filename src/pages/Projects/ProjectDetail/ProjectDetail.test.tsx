import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Suspense } from "react";

import ProjectDetail from "./ProjectDetail";
import ProjectDetailWrapper from "./ProjectDetail";

describe("Components/Layout", () => {
  it("works", () => {
    render(
      <MemoryRouter initialEntries={["/project/100"]}>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectDetail />
        </Suspense>
      </MemoryRouter>,
    );
  });
  it("Displays wrapper and loading state skeleton", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/project/100"]}>
        <ProjectDetailWrapper />
      </MemoryRouter>,
    );
    expect(
      document.body.getElementsByClassName("chakra-skeleton"),
    ).toBeDefined();
    expect(getByTestId("loading-project-details-skeleton")).toBeInTheDocument();
  });
});
