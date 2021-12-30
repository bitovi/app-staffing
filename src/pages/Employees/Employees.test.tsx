import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import { SWRConfig } from "swr";
import employeeStoreManager from "../../mocks/employees/mocks";
import { clearFixtures, loadFixtures } from "../../mocks";

import EmployeesWrapper from "./Employees";

describe("Pages/Employees", () => {
  jest.setTimeout(30000);
  jest.useFakeTimers();
  jest.runAllTimers();

  beforeEach(async () => loadFixtures());
  afterEach(async () => clearFixtures());

  it("renders data in list", async () => {
    render(<EmployeesWrapper />);
    const memberRows = await screen.findAllByRole("button", {
      name: "Edit Member",
      exact: false,
    });
    expect(memberRows[0]).toBeInTheDocument();
  });

  it("Displays loading state skeleton", () => {
    render(<EmployeesWrapper />);
    expect(
      document.body.getElementsByClassName("chakra-skeleton"),
    ).toBeDefined();
  });

  it("Creates new employee", async () => {
    render(<EmployeesWrapper />);
    const addButton = await screen.findByRole("button", {
      name: /add team member/i,
    });
    addButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const modal = await screen.findByRole("dialog");
    const submitButton = within(modal).getByText(/Add & Close/i);
    expect(submitButton).toBeDisabled();

    const modalNameInput = await screen.findByPlaceholderText(/name/i);
    fireEvent.change(modalNameInput, {
      target: { value: "Johnny Appleseed" },
    });
    expect(modalNameInput).toHaveValue("Johnny Appleseed");

    // Name is the only required field in form
    await waitFor(() => expect(submitButton).toBeEnabled());

    const modalStartDateInput = await screen.findByTestId(/start_date/i);
    fireEvent.change(modalStartDateInput, {
      target: { value: "1993-01-24" },
    });
    expect(modalStartDateInput).toHaveValue("1993-01-24");

    const angularCheckBox = within(modal).getByLabelText("Angular");
    const designCheckBox = within(modal).getByLabelText("Design");

    expect(angularCheckBox).not.toBeChecked();
    expect(designCheckBox).not.toBeChecked();

    fireEvent.click(angularCheckBox);
    fireEvent.click(designCheckBox);

    expect(angularCheckBox).toBeChecked();
    expect(designCheckBox).toBeChecked();

    submitButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    await waitFor(() => expect(modal).not.toBeInTheDocument());
    // check for toast message
    const toastMessage = await screen.findByText("Team member added", {
      exact: false,
    });

    await waitFor(() => expect(toastMessage).not.toBeInTheDocument());

    // check for new table row for employee
    const newEmployeeRow = await screen.findByRole("row", {
      name: /Johnny Appleseed/,
      exact: false,
    });
    expect(newEmployeeRow).toBeInTheDocument();

    // Reopen the form and make sure the information has been cleared
    addButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(await screen.findByPlaceholderText(/name/i)).toHaveValue("");
    expect(await screen.findByTestId(/start_date/i)).toHaveValue("");
    expect(await screen.findByLabelText("Angular")).not.toBeChecked();
    expect(await screen.findByLabelText("Design")).not.toBeChecked();
  });

  it("Edits employee", async () => {
    render(<EmployeesWrapper />);

    await screen.findAllByRole("button", {
      name: "Edit Member",
      exact: false,
    });
    const memberRows = await screen.findAllByRole("row");
    const editMember = await within(memberRows[1]).findByLabelText(
      "Edit Member",
    );
    //before we edit Employee to add this skill, they do not have it.
    expect(within(memberRows[1]).queryByText("Design")).not.toBeInTheDocument();

    fireEvent.click(editMember);
    const editModal = await screen.findByRole("dialog");
    await screen.findByText("Edit Team Member");

    const reactCheckBox = within(editModal).getByLabelText("React");
    const projectManagementCheckbox =
      within(editModal).getByLabelText("Project Management");

    expect(reactCheckBox).toBeChecked();
    expect(projectManagementCheckbox).toBeChecked();

    const submitButton = within(editModal).getByText(/Save & Close/i);
    expect(submitButton).toBeDisabled();

    fireEvent.click(within(editModal).getByLabelText("Design"));
    await waitFor(() => expect(submitButton).toBeEnabled());

    fireEvent.click(submitButton);
    await waitFor(() => expect(editModal).not.toBeInTheDocument());

    // check for toast message
    const toastMessage = await screen.findByText("Team member updated", {
      exact: false,
    });

    await waitFor(() => expect(toastMessage).not.toBeInTheDocument());

    const editedEmployee = await within(memberRows[1]).findByText("Design");
    //we now check for the same skill, and the Employee has it
    expect(editedEmployee).toBeInTheDocument();
  });

  it("Deletes employee", async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <EmployeesWrapper />
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

    deleteMember.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const deleteModal = await screen.findByRole("dialog");
    expect(deleteModal).toBeInTheDocument();

    const deleteButton = await screen.findByLabelText(/confirm button/i);

    deleteButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const toastMessage = await screen.findByText(
      `${employeeName} was successfully deleted`,
      {
        exact: false,
      },
    );
    await waitFor(() => expect(toastMessage).not.toBeInTheDocument());

    expect(employeeToDelete).not.toBeInTheDocument;

    const employeeStore = await employeeStoreManager.store.getListData();

    expect(employeeStore.data).toHaveLength(4);
  });
});
