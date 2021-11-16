// import { Suspense } from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import { employees } from "../../services/api/employees/fixtures";
import { employeeStoreManager } from "../../services/api/employees/mocks";
import { employeeSkillsStoreManager } from "../../services/api/employee_skills/mocks";
import { skillStoreManager } from "../../services/api/skills/mocks";

import EmployeesWrapper from "./Employees";
import { PortalManager } from "@chakra-ui/portal";

const renderWithPortal = (ui: React.ReactElement) =>
  render(<PortalManager>{ui}</PortalManager>);

describe("Pages/Employees", () => {
  beforeEach(async () => {
    await employeeStoreManager.load();
    await skillStoreManager.load();
    await employeeSkillsStoreManager.load();
  });

  afterEach(async () => {
    await employeeStoreManager.clear();
    await employeeSkillsStoreManager.clear();
    await skillStoreManager.clear();
    cleanup();
  });

  it("renders data in list", async () => {
    render(<EmployeesWrapper />);
    const addButton = await screen.findByRole("button", {
      name: /add team member/i,
    });
    expect(await screen.findByText("Sam Kreiger")).toBeInTheDocument();
    fireEvent.click(addButton);
    screen.debug();
  });

  // it("filters by name", async () => {
  //   render(<Employees />);

  //   // wait for the first row
  //   expect(
  //     await screen.findByDisplayValue(employees[0].name),
  //   ).toBeInTheDocument();

  //   // Filter by Sally
  //   userEvent.type(screen.getByPlaceholderText(/Filter/i), "Sally");

  //   // Make sure Tom is no longer visible
  //   expect(
  //     screen.queryByDisplayValue(employees[0].name),
  //   ).not.toBeInTheDocument();
  // });

  it("Displays loading state skeleton", () => {
    const { container } = render(<EmployeesWrapper />);
    expect(container.getElementsByClassName("chakra-skeleton")).toBeDefined();

    //expect(screen.getByText("Loading...")).toBe(true);
  });

  it("Creates new employee", async () => {
    render(<EmployeesWrapper />);
    const addButton = await screen.findByRole("button", {
      name: /add team member/i,
    });
    fireEvent.click(addButton);
    // expect(
    //   await screen.findByRole("button", { name: /Cancel/i }),
    // ).toBeInTheDocument();
    // expect(await tools.findByTestId("custom-element")).toBeInTheDocument();
    // const result = await screen.findAllByRole("dialog");
    // waitFor(() =>
    //   expect(
    //     document.getElementsByClassName("chakra-modal__content"),
    //   ).toBeInTheDocument(),
    // );
    // await waitFor(() => screen.getByTestId("custom-element"));

    // screen.debug(newThing);
  });
});
