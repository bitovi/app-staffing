import { render, screen, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import ProjectAddButton from "./ProjectAddButton";

describe("Pages/Projects/Components/ProjectAddButton", () => {
  it("renders", async () => {
    render(
      <Suspense fallback={<>Loading...</>}>
        <ProjectAddButton />
      </Suspense>,
    );

    waitFor(() => {
      expect(screen.getByText(/Create a new project/g)).toBeInTheDocument();
    });
  });
});
