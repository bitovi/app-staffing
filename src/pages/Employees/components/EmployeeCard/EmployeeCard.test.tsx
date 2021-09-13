import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import type { Employee } from "../../../../services/api";

import EmployeeCard from "./EmployeeCard";
import { employees } from "../../../../services/api/fixtures";

const employee: Employee = employees[0];

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

  it("update a field", () => {
    render(
      <MemoryRouter>
        <EmployeeCard
          key={employee.id}
          employee={employee}
          editing
          onEdit={() => null}
          onSave={() => null}
          onCancel={() => null}
        />
      </MemoryRouter>,
    );

    const container = screen.getByTestId("name");
    userEvent.type(container, "2");

    expect(container).to.have.value(employee.name + "2");
  });

  it("should add a skill", () => {
    render(
      <MemoryRouter>
        <EmployeeCard
          key={employee.id}
          employee={employee}
          editing
          onEdit={() => null}
          onSave={() => null}
          onCancel={() => null}
        />
      </MemoryRouter>,
    );

    const expected = "Angular";
    userEvent.selectOptions(screen.getByTestId("select-skills"), [expected]);

    const container = screen.getByTestId("display-skills").children.item(3);
    expect(container).to.contains.text(expected);
  });

  it("should remove a skill", () => {
    render(
      <MemoryRouter>
        <EmployeeCard
          key={employee.id}
          employee={employee}
          editing
          onEdit={() => null}
          onSave={() => null}
          onCancel={() => null}
        />
      </MemoryRouter>,
    );

    const expected = "Node";
    userEvent.click(screen.getAllByTestId("remove-skill")[1]);

    const container = screen.getByTestId("display-skills");
    expect(container).to.not.contains.text(expected);
  });
});
