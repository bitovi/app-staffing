import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { employees } from "../../services/api/fixtures";

import Employees from "./Employees";

describe("Pages/Employees", () => {
  it("works", async () => {
    render(<Employees />);
    expect(screen.getByText("Team")).toBeInTheDocument();
  });

  it("shows names", async () => {
    render(<Employees />);

    // wait for the first row
    expect(
      await screen.findByDisplayValue(employees[0].name),
    ).toBeInTheDocument();

    // check the rest of the rows
    expect(screen.getByDisplayValue(employees[1].name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(employees[2].name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(employees[3].name)).toBeInTheDocument();
  });

  it("filters by name", async () => {
    render(<Employees />);

    // wait for the first row
    expect(
      await screen.findByDisplayValue(employees[0].name),
    ).toBeInTheDocument();

    // Filter by Sally
    userEvent.type(screen.getByPlaceholderText(/Filter/i), "Sally");

    // Make sure Tom is no longer visible
    expect(
      screen.queryByDisplayValue(employees[0].name),
    ).not.toBeInTheDocument();
  });
});
