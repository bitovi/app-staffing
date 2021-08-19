import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import { MemoryRouter } from "react-router-dom";

import EmployeeCard from "./EmployeeCard";
import { employeeData } from "../../services/api/mocks";

describe("Components/Layout", () => {
  it("works", () => {
    render(
      <MemoryRouter>
        <EmployeeCard data={employeeData[0]} />
      </MemoryRouter>,
    );

    const container = screen.getByText(/Start Date/i);
    expect(container).to.have.tagName("label");
  });
});
