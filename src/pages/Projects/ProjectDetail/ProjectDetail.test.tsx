import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Suspense } from "react";

import ProjectDetail from "./ProjectDetail";

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
});
