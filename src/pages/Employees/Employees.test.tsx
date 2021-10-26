import { Suspense } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { employees } from "../../services/api/employees/fixtures";
import { employeeStoreManager } from "../../services/api/employees/mocks";

import Employees from "../Employees";

describe("Pages/Employees", () => {
  beforeEach(async () => {
    await employeeStoreManager.load();
  });

  afterEach(async () => {
    await employeeStoreManager.clear();
  });

  it("renders", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Employees />
      </Suspense>,
    );

    expect(await screen.findByText("Team")).toBeInTheDocument();
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
