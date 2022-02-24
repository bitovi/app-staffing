import { render, screen } from "@testing-library/react";

import Dashboard from "./Dashboard";

describe("Pages/Dashboard", () => {
  it("works", async () => {
    render(<Dashboard />);
    expect(screen.getByTestId("dashboardTitle")).toBeInTheDocument();
  });
});
