import { render, screen, waitFor, within } from "@testing-library/react";
import { employees } from "../../../../mocks/fixtures";
import EmployeeTableWrapper from "./EmployeeTable";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import EmployeeTable from "./EmployeeTable";

describe("EmployeeTable", () => {
  it("has an 'empty' state", async () => {
    render(
      <MemoryRouter>
        <EmployeeTableWrapper
          updateEmployee={() => Promise.resolve()}
          destroyEmployee={() => Promise.resolve()}
          showInactiveEmployees={false}
          useEmployees={() => []}
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

  it("chevron icon shows in sorted column header", async () => {
    render(
      <MemoryRouter>
        <EmployeeTable
          updateEmployee={() => Promise.resolve()}
          destroyEmployee={() => new Promise<void>((resolve) => resolve())}
          showInactiveEmployees={false}
          useEmployees={() => employees}
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
          destroyEmployee={() => new Promise<void>((resolve) => resolve())}
          showInactiveEmployees={false}
          useEmployees={() => employees}
        />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("sort-icon-desc"));
  });

  it("should not retain error message in delete confirmation modal", async () => {
    const { findByRole, findAllByRole } = render(
      <MemoryRouter>
        <EmployeeTableWrapper
          updateEmployee={() => Promise.resolve()}
          destroyEmployee={(id: string) => {
            return new Promise((res, rej) => {
              setTimeout(() => {
                rej({ message: "Uh-oh, something bad happened" });
              }, 10);
            });
          }}
          showInactiveEmployees={false}
          useEmployees={() => {
            return employees;
          }}
        />
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
});
