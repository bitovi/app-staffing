import { render, screen } from "@testing-library/react";
import { employees } from "../../../../mocks/fixtures";
import EmployeeTableWrapper from "./EmployeeTable";
import { MemoryRouter } from "react-router-dom";

describe("EmployeeTable", () => {
  it("has an 'empty' state", async () => {
    render(
      <MemoryRouter>
        <EmployeeTableWrapper
          updateEmployee={() => Promise.resolve()}
          destroyEmployee={() => Promise.resolve()}
          showInactiveEmployees={false}
          useEmployees={() => {
            return [];
          }}
        />
        ,
      </MemoryRouter>,
    );

    expect(screen.getByText(/There are currently no team members./i));
  });

  it("shows employees", async () => {
    render(
      <MemoryRouter>
        <EmployeeTableWrapper
          updateEmployee={() => Promise.resolve()}
          destroyEmployee={() => Promise.resolve()}
          showInactiveEmployees={false}
          useEmployees={() => {
            return employees;
          }}
        />
      </MemoryRouter>,
    );
    expect(await screen.findByText(employees[0].name)).toBeInTheDocument();
  });
});
