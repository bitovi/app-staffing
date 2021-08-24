import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import { MemoryRouter } from "react-router-dom";

import EmployeeCard from "./EmployeeCard";
import { employees } from "../../../../services/api/fixtures";

const employee = employees[0];

describe("Components/Layout", () => {
  it("works", () => {
    render(
      <MemoryRouter>
        <EmployeeCard
          key={employee.id}
          employee={employee}
          editing={false}
          onEdit={() => null}
          onSave={() => null}
          onCancel={() => null}
        />
      </MemoryRouter>,
    );

    const container = screen.getByText(/Start Date/i);
    expect(container).to.have.tagName("label");
  });
});