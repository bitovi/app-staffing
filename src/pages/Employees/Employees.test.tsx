// import { Suspense } from "react";
import { render /*screen, fireEvent*/ } from "@testing-library/react";
import { employeeMockData } from "../../services/api/employees/fixtures";
// import userEvent from "@testing-library/user-event";

// import { employees } from "../../services/api/employees/fixtures";
// import { employeeStoreManager } from "../../services/api/employees/mocks";

import EmployeesWrapper, { Employees } from "./Employees";

describe("Pages/Employees", () => {
  // beforeEach(async () => {
  //   await employeeStoreManager.load();
  // });

  // afterEach(async () => {
  //   await employeeStoreManager.clear();
  // });

  it("renders data in list", async () => {
    const { container } = render(
      <Employees
        useEmployees={employeeMockData}
        useSkills={(): any => {
          return { skills: null };
        }}
      />,
    );

    expect(container).toHaveTextContent("Vitor");
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

  // it("Displays delete message", async () => {});
});
