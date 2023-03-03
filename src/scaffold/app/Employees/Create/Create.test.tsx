import { render, screen } from "@testing-library/react";

import Create from "./Create";

describe("scaffold/app/Employees/Create", () => {
  it("renders form", async () => {
    render(<Create />);
    const pageHeader = await screen.findByText(/employee/i);
    const nameLabel = await screen.findByText("Name");
    const startDateLabel = await screen.findByText("Name");
    const endDateLabel = await screen.findByText("Name");
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader?.tagName).toBe("H1");
    expect(nameLabel).toBeInTheDocument();
    expect(startDateLabel).toBeInTheDocument();
    expect(endDateLabel).toBeInTheDocument();
  });
});
