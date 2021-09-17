import { render, screen, within } from "@testing-library/react";
import { select as selectEvent } from "react-select-event";

import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { Employee } from "../../../../services/api";
import { employees } from "../../../../services/api/employees/fixtures";
import EmployeeCard from "./EmployeeCard";

const employee: Employee = employees[0];

describe("Components/Layout", () => {
  it("works", () => {
    render(
      <MemoryRouter>
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onSave={() => null}
        />
      </MemoryRouter>,
    );

    const container = screen.getByText(/Start Date/i);
    expect(container.tagName).toBe("LABEL");
  });

  it("update a field", () => {
    render(
      <MemoryRouter>
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onSave={() => null}
        />
      </MemoryRouter>,
    );

    const container = screen.getByTestId("name");
    userEvent.type(container, "2");

    expect(container).toHaveValue(employee.name + "2");
  });

  it("should add a skill", async () => {
    render(
      <MemoryRouter>
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onSave={jest.fn()}
        />
      </MemoryRouter>,
    );

    await selectEvent(screen.getByLabelText(/Add skill/i), /Angular/i);
    await within(screen.getByTestId("display-skills")).findByText(/Angular/i);
  });

  it("should remove a skill", () => {
    render(
      <MemoryRouter>
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onSave={() => null}
        />
      </MemoryRouter>,
    );

    const expected = "Node";
    userEvent.click(screen.getAllByTestId("remove-skill")[1]);

    const container = screen.getByTestId("display-skills");
    expect(container).not.toHaveTextContent(expected);
  });
});
