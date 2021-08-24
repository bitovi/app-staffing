import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Employees from "./Employees";

test("Employees renders", async () => {
  render(<Employees />);
  expect(screen.getByText("Team")).toBeInTheDocument();
});

test("employee names render", async () => {
  render(<Employees />);

  // wait for the first row
  expect(await screen.findByDisplayValue(/Tom/i)).toBeInTheDocument();

  // check the rest of the rows
  expect(screen.getByDisplayValue(/Sally/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/Paul/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/Stephanie/i)).toBeInTheDocument();
});

test("filter by employee name", async () => {
  render(<Employees />);

  // wait for the first row
  expect(await screen.findByDisplayValue(/Tom/i)).toBeInTheDocument();

  // Filter by Sally
  userEvent.type(screen.getByPlaceholderText(/Filter/i), "Sally");

  // Make sure Tom is no longer visible
  expect(screen.queryByDisplayValue(/Tom/i)).not.toBeInTheDocument();
});
