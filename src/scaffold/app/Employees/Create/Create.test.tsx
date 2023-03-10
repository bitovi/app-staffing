import { render, screen } from "@testing-library/react";

import Create from "./Create";

describe("scaffold/app/Employees/Create", () => {
  it("renders form", async () => {
    render(<Create />);
    const pageHeader = await screen.findByText(/employee/i);
    const nameLabel = await screen.findAllByText("Name");
    const startDateLabel = await screen.findAllByText("Start Date");
    const endDateLabel = await screen.findAllByText("End Date");
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader?.tagName).toBe("H1");
    expect(nameLabel[0]).toBeInTheDocument();
    expect(startDateLabel[0]).toBeInTheDocument();
    expect(endDateLabel[0]).toBeInTheDocument();
  });
});
