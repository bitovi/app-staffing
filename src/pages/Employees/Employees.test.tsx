import {
  fireEvent,
  render,
  screen,
  within,
  waitForElementToBeRemoved,
  cleanup,
  act,
} from "@testing-library/react";
import { SWRConfig } from "swr";
import { employeeStoreManager } from "../../services/api/employees/mocks";
import { employeeSkillsStoreManager } from "../../services/api/employee_skills/mocks";
import { skillStoreManager } from "../../services/api/skills/mocks";

import EmployeesWrapper from "./Employees";

describe("Pages/Employees", () => {
  let container: any;
  beforeEach(async () => {
    await employeeStoreManager.load();
    await skillStoreManager.load();
    await employeeSkillsStoreManager.load();
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(async () => {
    await employeeStoreManager.clear();
    await employeeSkillsStoreManager.clear();
    await skillStoreManager.clear();
    document.body.removeChild(container);
    container = null;
  });
  afterEach(cleanup);

  it("renders data in list", async () => {
    act(() => {
      render(<EmployeesWrapper />, container);
    });
    expect(await screen.findByText("Sam Kreiger")).toBeInTheDocument();
  });

  // it("filters by name", async () => {
  //   render(<Employees />);

  //   // wait for the first row
  //   expect(
  //     await screen.findByDisplayValue(employees[0].name),
  //   ).toBeInTheDocument();

  //   // Filter by Sally
  //   userEvent.type(screen.getByPlaceholderText(/Filter/i), "Sally");

  //   // Make sure Tom is no longer visible
  //   expect(
  //     screen.queryByDisplayValue(employees[0].name),
  //   ).not.toBeInTheDocument();
  // });

  it("Displays loading state skeleton", () => {
    act(() => {
      render(<EmployeesWrapper />, container);
    });
    expect(container.getElementsByClassName("chakra-skeleton")).toBeDefined();
  });

  it("Creates new employee", async () => {
    act(() => {
      render(<EmployeesWrapper />, container);
    });
    const addButton = await screen.findByRole("button", {
      name: /add team member/i,
    });
    act(() => {
      addButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
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

    const modal = await screen.findByRole("dialog");
    const submitButton = within(modal).getByText(/Add & Close/i);
    expect(submitButton).toBeDisabled();

    const angularCheckBox = within(modal).getByLabelText("Angular");
    const designCheckBox = within(modal).getByLabelText("Design");

    expect(angularCheckBox).not.toBeChecked();
    expect(designCheckBox).not.toBeChecked();

    fireEvent.click(angularCheckBox);
    fireEvent.click(designCheckBox);

    expect(angularCheckBox).toBeChecked();
    expect(designCheckBox).toBeChecked();

    expect(submitButton).toBeEnabled();

    act(() => {
      submitButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    const NewEmployee = await screen.findByText(/Johnny Appleseed/i);

    expect(NewEmployee).toBeInTheDocument();
  });

  it("Deletes employee", async () => {
    act(() => {
      render(
        <SWRConfig value={{ provider: () => new Map() }}>
          <EmployeesWrapper />
        </SWRConfig>,
        container,
      );
    });
    expect(await screen.findByText("Rosemarie Mitchell")).toBeInTheDocument();

    const rosemarieRow = await screen.findByRole("row", {
      name: /Rosemarie Mitchell/,
      exact: false,
    });
    const deleteMember = await within(rosemarieRow).findByLabelText(
      "Delete Member",
    );

    act(() => {
      deleteMember.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const deleteModal = await screen.findByRole("dialog");
    expect(deleteModal).toBeInTheDocument();

    const deleteButton = await screen.findByLabelText(/confirm button/i);

    act(() => {
      deleteButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitForElementToBeRemoved(() =>
      screen.queryAllByText("Rosemarie Mitchell", { exact: false }),
    );

    const employeeStore = await employeeStoreManager.store.getListData();

    expect(employeeStore.data).toHaveLength(4);
  });
});
