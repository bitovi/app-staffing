import {
  render,
  screen,
  within,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { SWRConfig } from "swr";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
import { clearFixtures, loadFixtures } from "../../mocks";
import { employees } from "../../mocks/employees/fixtures";

import Employees from "./Employees";
import { Employee } from "../../services/api";

describe("Pages/Employees", () => {
  jest.setTimeout(30000);
  jest.useFakeTimers();
  jest.runAllTimers();

  beforeEach(async () => {
    await loadFixtures();
  });

  afterEach(async () => {
    await clearFixtures();
    cleanup();
  });

  describe("Employees list", () => {
    beforeEach(() => {
      render(<Employees />);
    });

    it("renders data in list", async () => {
      const memberRows = await screen.findAllByRole("button", {
        name: "Edit Member",
        exact: false,
      });
      expect(memberRows[0]).toBeInTheDocument();
    });

    it("shows only active employees by default", async () => {
      const endDates = await screen.findAllByTestId("employeeEndDate");
      const validDates = endDates.map(
        (d) => d.innerHTML === "" || Date.parse(d.innerHTML) > Date.now(),
      );
      expect(validDates).not.toContain(false);
    });

    //TODO test fails because one date entry is off by a date
    it.skip("shows all employees after clicking inactive employees toggle", async () => {
      const inactiveToggle = await screen.findByLabelText(
        "Show inactive team members",
      );
      await waitFor(() => userEvent.click(inactiveToggle));
      const endDates = await screen.findAllByTestId("employeeEndDate");
      expect(endDates.map((e) => e.innerHTML).sort()).toEqual(
        employees
          .map((e) =>
            e.attributes.end_date
              ? format(e.attributes.end_date, "MM/dd/yyyy")
              : "",
          )
          .sort(),
      );
    });
  });

  it("Displays loading state skeleton", () => {
    render(<Employees />);
    expect(
      document.body.getElementsByClassName("chakra-skeleton"),
    ).toBeDefined();
  });

  it("renders breadcrumbs", () => {
    const { queryByTestId } = render(<Employees />);

    const homeBreadcrumb = queryByTestId("homeBreadcrumb");
    const employeesBreadcrumb = queryByTestId("employeesBreadcrumb");

    expect(homeBreadcrumb).toBeInTheDocument();
    expect(employeesBreadcrumb).toBeInTheDocument();
  });

  it("renders home breadcrumb with the correct link", () => {
    const { queryByTestId } = render(<Employees />);

    const homeBreadcrumb = queryByTestId("homeBreadcrumb");

    expect(homeBreadcrumb?.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders team member breadcrumb as span", () => {
    const { queryByTestId } = render(<Employees />);

    const employeesBreadcrumb = queryByTestId("employeesBreadcrumb");

    expect(employeesBreadcrumb?.tagName.toLowerCase()).toBe("span");
  });

  it("Renders h1 tag for page title", () => {
    render(<Employees />);

    const pageTitle = screen.getByTestId("employeesTitle");

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle?.tagName).toBe("H1");
    expect(pageTitle?.innerHTML).toBe("Team Members");
  });

  it.skip("Creates employee", async () => {
    render(<Employees />);

    const addButton = screen.getByText(/add team member/i);

    userEvent.click(addButton);

    const modal = await screen.findByRole("dialog");
    const submitButton = within(modal).getByText(/Add & Close/i);
    expect(submitButton).toHaveAttribute("aria-disabled", "true");

    const modalNameInput = await screen.findByPlaceholderText(/name/i);
    userEvent.type(modalNameInput, "Johnny Appleseed");
    expect(modalNameInput).toHaveValue("Johnny Appleseed");

    await waitFor(() => expect(submitButton).toBeEnabled());

    const angularCheckBox = screen.getByLabelText("Angular");
    const reactCheckbox = screen.getByLabelText("React");

    expect(angularCheckBox).not.toBeChecked();
    expect(reactCheckbox).not.toBeChecked();

    userEvent.click(angularCheckBox);
    userEvent.click(reactCheckbox);

    expect(angularCheckBox).toBeChecked();
    expect(reactCheckbox).toBeChecked();

    userEvent.click(submitButton);

    const toastMessage = await screen.findByText("Team member added", {
      exact: false,
    });

    await waitFor(() => expect(toastMessage).not.toBeInTheDocument());

    const newEmployeeRow = await screen.findByRole("row", {
      name: /Johnny Appleseed/,
      exact: false,
    });
    expect(newEmployeeRow).toBeInTheDocument();

    // Make sure roles are listed in the team member row
    within(newEmployeeRow).getByText("Angular");
    within(newEmployeeRow).getByText("React");
  });

  it("resets modal form fields when closed", async () => {
    render(<Employees />);

    const addButton = screen.getByText(/add team member/i);

    userEvent.click(addButton);

    const modal = await screen.findByRole("dialog");
    const cancelButton = within(modal).getByText(/Cancel/i);

    const modalNameInput = await screen.findByPlaceholderText(/name/i);
    userEvent.type(modalNameInput, "Johnny Appleseed");
    expect(modalNameInput).toHaveValue("Johnny Appleseed");

    userEvent.click(cancelButton);

    await waitFor(() => expect(modal).not.toBeInTheDocument());

    userEvent.click(addButton);

    const modalNameInput2 = await screen.findByPlaceholderText(/name/i);
    expect(modalNameInput2).toHaveValue("");
  });

  it("Edits employee", async () => {
    render(<Employees />);

    const memberRows = await screen.findAllByRole("row");
    const editMember = await within(memberRows[1]).findByLabelText(
      "Edit Member",
    );

    userEvent.click(editMember);
    const editModal = await screen.findByRole("dialog");
    await within(editModal).findByText("Edit Team Member");

    const checkboxes = await within(editModal).findAllByRole("checkbox");
    const isChecked = (el: unknown) => (el as HTMLInputElement).checked;
    const unchecked = checkboxes.filter(
      (el) => !isChecked(el),
    ) as HTMLInputElement[];

    // fail the test in case the fixture data changes
    if (!unchecked[0]) throw new Error("At least one role must be unselected");

    const submitButton = within(editModal).getByText(/Save & Close/i);
    expect(submitButton).toHaveAttribute("aria-disabled", "true");

    userEvent.click(unchecked[0]);
    await waitFor(() =>
      expect(submitButton).not.toHaveAttribute("aria-disabled", "true"),
    );

    userEvent.click(submitButton);
    await waitFor(() => expect(editModal).not.toBeInTheDocument());

    // check for toast message
    await screen.findAllByText("Team member updated", {
      exact: false,
    });

    const newRole = getInputLabel(unchecked[0]) || "unknown role label";
    await within(memberRows[1]).findByText(newRole);
  });

  it("Deletes employee", async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <Employees />
      </SWRConfig>,
    );
    await screen.findAllByRole("button", {
      name: "Delete Member",
      exact: false,
    });

    const employeeRows = await screen.findAllByRole("row");
    const employeeToDelete = employeeRows[1];
    const employeeName =
      within(employeeToDelete).getAllByRole("gridcell")[0].textContent;

    const deleteMember = await within(employeeToDelete).findByLabelText(
      "Delete Member",
    );

    userEvent.click(deleteMember);

    const deleteModal = await screen.findByRole("dialog");
    expect(deleteModal).toBeInTheDocument();

    const deleteButton = await screen.findByLabelText(/confirm button/i);

    userEvent.click(deleteButton);

    const toastMessage = await screen.findByText(
      `${employeeName} was successfully deleted`,
      {
        exact: false,
      },
    );
    await waitFor(() => expect(toastMessage).not.toBeInTheDocument());
    expect(employeeToDelete).not.toBeInTheDocument();
  });

  it("should not retain error message in delete confirmation modal", async () => {
    const { findByRole, findAllByRole } = render(
      <Employees
        useEmployeeMutations={() => ({
          destroyEmployee: (id: string) => {
            return new Promise((res, rej) => {
              setTimeout(() => {
                rej({ message: "Uh-oh, something bad happened" });
              }, 10);
            });
          },
          updateEmployee: (id: string, data: Partial<Employee>) =>
            Promise.resolve(undefined),
          createEmployee: (data: Partial<Omit<Employee, "id">>) =>
            Promise.resolve(""),
        })}
      />,
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

  function getInputLabel(el: HTMLInputElement) {
    if (el.labels == null) return null;
    return el.labels[0].textContent;
  }
});
