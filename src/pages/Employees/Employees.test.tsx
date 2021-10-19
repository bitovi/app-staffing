import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { employees } from "../../services/api/employees/fixtures";
import { employeeStoreManager } from "../../services/api/employees/mocks";

import Employees from "./Employees";

describe("Pages/Employees", () => {
  beforeEach(async () => {
    await employeeStoreManager.loadResources();
  });

  afterEach(async () => {
    await employeeStoreManager.clearResources();
  });

  it("works", async () => {
    render(<Employees />);
    expect(screen.getByText("Team")).toBeInTheDocument();
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
