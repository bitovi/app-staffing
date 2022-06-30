import noop from "lodash/noop";
import { render, screen, within, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { employees } from "../../../../mocks/fixtures";
import EmployeeTable from "./EmployeeTable";
import { MemoryRouter } from "react-router-dom";

describe("EmployeeTable", () => {
  it("has an 'empty' state", async () => {
    render(
      <MemoryRouter>
        <EmployeeTable
          updateEmployee={() => Promise.resolve()}
          destroyEmployee={(id) => new Promise((resolve) => resolve())}
          employees={[]}
          skills={[]}
          changeSort={() => null}
          sortData=""
        />
        ,
      </MemoryRouter>,
    );

    expect(screen.getByText(/There are currently no team members./i));
  });

  it("shows employees", async () => {
    render(
      <MemoryRouter>
        <EmployeeTable
          updateEmployee={() => Promise.resolve()}
          destroyEmployee={(id) => new Promise((resolve) => resolve())}
          employees={employees}
          skills={[]}
          changeSort={() => null}
          sortData=""
        />
      </MemoryRouter>,
    );

    employees.forEach((employee) => {
      expect(screen.getByText(employee.name)).toBeInTheDocument();
    });
  });

  it("chevron icon shows in sorted column header", async () => {
    render(
      <MemoryRouter>
        <EmployeeTable
          updateEmployee={() => Promise.resolve()}
          destroyEmployee={(id) => new Promise((resolve) => resolve())}
          employees={employees}
          skills={[]}
          changeSort={() => null}
          sortData="start_date"
        />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("sort-icon-asc"));
  });

  it("chevron icon shows for sorted column header in descending order with '-' prefix", async () => {
    render(
      <MemoryRouter>
        <EmployeeTable
          updateEmployee={() => Promise.resolve()}
          destroyEmployee={(id) => new Promise((resolve) => resolve())}
          employees={employees}
          skills={[]}
          changeSort={() => null}
          sortData="-start_date"
        />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("sort-icon-desc"));
  });

  it("should not retain error message in delete confirmation modal", async () => {
    const deferred = makeDeferred();

    const { findByRole, findAllByRole } = render(
      <MemoryRouter>
        <EmployeeTable
          updateEmployee={() => Promise.resolve()}
          destroyEmployee={(id) => deferred.promise}
          employees={employees}
          skills={[]}
          changeSort={() => null}
          sortData=""
        />
        ,
      </MemoryRouter>,
    );

    // click delete icon on the employee table row
    const employeeRows = await findAllByRole("row");
    const employeeToDelete = employeeRows[1];
    const deleteButton = await within(employeeToDelete).findByRole("button", {
      name: "Delete Member",
    });
    userEvent.click(deleteButton);

    // make sure the confirmation modal shows up
    const confirmationModal = await findByRole("dialog");
    const confirmButton = await within(confirmationModal).findByLabelText(
      /confirm button/i,
    );
    userEvent.click(confirmButton);

    // make sure the CTA button has the loading state once it has been clicked
    expect(confirmButton).toHaveAttribute("data-loading");
    await within(confirmationModal).findByText(/deleting team member/i);

    // simulate an error from the delete employee endpoint
    act(() => {
      deferred.reject(new Error("Uh-oh, something bad happened"));
    });

    // check the button loading state was removed and the error
    await waitFor(() => {
      expect(confirmButton).not.toHaveAttribute("data-loading");
    });
    const errorAlert = await within(confirmationModal).findByRole("alert");
    await within(errorAlert).findByText(/something bad happened/);

    // Dismiss the confirmation modal
    const cancelButton = within(confirmationModal).getByRole("button", {
      name: "Cancel",
    });
    userEvent.click(cancelButton);
    await waitFor(() => {
      expect(confirmationModal).not.toBeInTheDocument();
    });

    // Try to delete the employee again
    userEvent.click(deleteButton);
    const secondConfirmationModal = await findByRole("dialog");

    // make sure the previous error alert does not persist
    const secondErrorAlert = await within(secondConfirmationModal).queryByRole(
      "alert",
    );
    expect(secondErrorAlert).toBeNull();

    // the confirm button loading state should not persist
    const secondConfirmButton = await within(confirmationModal).findByLabelText(
      /confirm button/i,
    );
    expect(secondConfirmButton).not.toHaveAttribute("data-loading");
  });

  function makeDeferred() {
    let resolve = noop;
    let reject = noop;

    const promise = new Promise<void>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return {
      resolve,
      reject,
      promise,
    };
  }
});
