import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Employees from "./Employees";

describe("Pages/Employees", () => {
  it("works", async () => {
    render(<Employees />);
    expect(screen.getByText("Team")).toBeInTheDocument();
  });

  it("shows names", async () => {
    render(<Employees />);

    // wait for the first row
    expect(await screen.findByDisplayValue(/Tom/i)).toBeInTheDocument();

    // check the rest of the rows
    expect(screen.getByDisplayValue(/Sally/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Paul/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Stephanie/i)).toBeInTheDocument();
  });

  it("filters by name", async () => {
    render(<Employees />);

    // wait for the first row
    expect(await screen.findByDisplayValue(/Tom/i)).toBeInTheDocument();

    // Filter by Sally
    userEvent.type(screen.getByPlaceholderText(/Filter/i), "Sally");

    // Make sure Tom is no longer visible
    expect(screen.queryByDisplayValue(/Tom/i)).not.toBeInTheDocument();
  });
});
