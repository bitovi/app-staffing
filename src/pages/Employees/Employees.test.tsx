import {
  fireEvent,
  render,
  screen,
  within,
  waitForElementToBeRemoved,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { SWRConfig } from "swr";
import { employeeStoreManager } from "../../services/api/employees/mocks";
import { employeeSkillsStoreManager } from "../../services/api/employee_skills/mocks";
import { skillStoreManager } from "../../services/api/skills/mocks";

import EmployeesWrapper from "./Employees";

describe("Pages/Employees", () => {
  beforeEach(async () => {
    await employeeStoreManager.load();
    await skillStoreManager.load();
    await employeeSkillsStoreManager.load();
  });

  afterEach(async () => {
    await employeeStoreManager.clear();
    await employeeSkillsStoreManager.clear();
    await skillStoreManager.clear();
    cleanup();
  });

  it("renders data in list", async () => {
    render(<EmployeesWrapper />);
    expect(await screen.findByText("Sam Kreiger")).toBeInTheDocument();
  });

  it("Displays loading state skeleton", () => {
    render(<EmployeesWrapper />);
    expect(
      document.body.getElementsByClassName("chakra-skeleton"),
    ).toBeDefined();
  });

  it("Creates new employee", async () => {
    jest.setTimeout(30000);
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

    await waitFor(() => expect(submitButton).toBeEnabled());
    submitButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    const NewEmployee = await screen.findByText(/Johnny Appleseed/i);

    expect(NewEmployee).toBeInTheDocument();
  }, 30000);

  it("Edits employee", async () => {
    jest.setTimeout(30000);
    render(<EmployeesWrapper />);

    const rosemarieRow = await screen.findByRole("row", {
      name: /Rosemarie Mitchell/,
      exact: false,
    });
    const editMember = await within(rosemarieRow).findByLabelText(
      "Edit Member",
    );
    //before we edit Employee to add this skill, they do not have it.
    expect(within(rosemarieRow).queryByText("Design")).not.toBeInTheDocument();

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
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    const editedEmployee = await within(rosemarieRow).findByText("Design");
    //we now check for the same skill, and the Employee has it
    expect(editedEmployee).toBeInTheDocument();
  }, 30000);

  it("Deletes employee", async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <EmployeesWrapper />
      </SWRConfig>,
    );
    expect(await screen.findByText("Rosemarie Mitchell")).toBeInTheDocument();

    const rosemarieRow = await screen.findByRole("row", {
      name: /Rosemarie Mitchell/,
      exact: false,
    });
    const deleteMember = await within(rosemarieRow).findByLabelText(
      "Delete Member",
    );

    deleteMember.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const deleteModal = await screen.findByRole("dialog");
    expect(deleteModal).toBeInTheDocument();

    const deleteButton = await screen.findByLabelText(/confirm button/i);

    deleteButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    await waitForElementToBeRemoved(() =>
      screen.queryAllByText("Rosemarie Mitchell", { exact: false }),
    );

    const employeeStore = await employeeStoreManager.store.getListData();

    expect(employeeStore.data).toHaveLength(4);
  });
});
