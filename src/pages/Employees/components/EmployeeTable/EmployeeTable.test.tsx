import { render, screen } from "@testing-library/react";
import { employees } from "../../../../mocks/fixtures";
import EmployeeTable from "./EmployeeTable";

describe("Components/Layout", () => {
  it("has an 'empty' state", async () => {
    render(
      <EmployeeTable
        updateEmployee={() => Promise.resolve()}
        destroyEmployee={(id) => new Promise((resolve) => resolve())}
        employees={[]}
        skills={[]}
      />,
    );

    expect(screen.getByText(/There are currently no team members./i));
  });

  it("shows employees", async () => {
    render(
      <EmployeeTable
        updateEmployee={() => Promise.resolve()}
        destroyEmployee={(id) => new Promise((resolve) => resolve())}
        employees={employees}
        skills={[]}
      />,
    );

    // wait for the first row
    expect(screen.getByText(employees[0].name)).toBeInTheDocument();

    // check the rest of the rows
    // expect(screen.getByDisplayValue(employees[1].name)).toBeInTheDocument();
    // expect(screen.getByDisplayValue(employees[2].name)).toBeInTheDocument();
    // expect(screen.getByDisplayValue(employees[3].name)).toBeInTheDocument();
  });
});
