import { render, screen, within } from "@testing-library/react";
import { select as selectEvent } from "react-select-event";

import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { Employee } from "../../../../services/api";
import { employees } from "../../../../services/api/employees/fixtures";
import EmployeeCard from "./EmployeeCard";
import { act } from "react-dom/test-utils";

const employee: Employee = employees[0];

jest.useFakeTimers("modern");

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

    const startDate = screen.getByText(/Start Date/i);
    expect(startDate.tagName).toBe("LABEL");

    const endDate = screen.getByText(/End Date/i);
    expect(endDate.tagName).toBe("LABEL");
  });

  it("call onSave after 500ms debounce", async () => {
    const onSave = jest.fn();
    render(
      <MemoryRouter>
        <EmployeeCard key={employee.id} employee={employee} onSave={onSave} />
      </MemoryRouter>,
    );

    const container = screen.getByLabelText("employee-name");
    userEvent.type(container, "2");
    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    userEvent.type(container, "5");

    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    expect(onSave).toHaveBeenCalledTimes(1);
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
