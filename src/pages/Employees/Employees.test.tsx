import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import { SWRConfig } from "swr";
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

  it("renders breadcrumbs", () => {
    const { queryByTestId } = render(<EmployeesWrapper />);

    const homeBreadcrumb = queryByTestId("homeBreadcrumb");
    const employeesBreadcrumb = queryByTestId("employeesBreadcrumb");

    expect(homeBreadcrumb).toBeInTheDocument();
    expect(employeesBreadcrumb).toBeInTheDocument();
  });

  it("renders home breadcrumb with the correct link", () => {
    const { queryByTestId } = render(<EmployeesWrapper />);

    const homeBreadcrumb = queryByTestId("homeBreadcrumb");

    expect(homeBreadcrumb?.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders team member breadcrumb as span", () => {
    const { queryByTestId } = render(<EmployeesWrapper />);

    const employeesBreadcrumb = queryByTestId("employeesBreadcrumb");

    expect(employeesBreadcrumb?.tagName.toLowerCase()).toBe("span");
  });

  it("Creates employee", async () => {
    render(<EmployeesWrapper />);

    const addButton = screen.getByText(/add team member/i);

    fireEvent.click(addButton);

    const modal = await screen.findByRole("dialog");
    const submitButton = within(modal).getByText(/Add & Close/i);
    expect(submitButton).toHaveAttribute("aria-disabled", "true");

    const modalNameInput = await screen.findByPlaceholderText(/name/i);
    fireEvent.change(modalNameInput, {
      target: { value: "Johnny Appleseed" },
    });
    expect(modalNameInput).toHaveValue("Johnny Appleseed");

    await waitFor(() => expect(submitButton).toBeEnabled());

    const angularCheckBox = screen.getByLabelText("Angular");
    const reactCheckbox = screen.getByLabelText("React");

    expect(angularCheckBox).not.toBeChecked();
    expect(reactCheckbox).not.toBeChecked();

    fireEvent.click(angularCheckBox);
    fireEvent.click(reactCheckbox);

    expect(angularCheckBox).toBeChecked();
    expect(reactCheckbox).toBeChecked();

    fireEvent.click(submitButton);

    const toastMessage = await screen.findByText("Team member added", {
      exact: false,
    });

    await waitFor(() => expect(toastMessage).not.toBeInTheDocument());

    const newEmployeeRow = await screen.findByRole("row", {
      name: /Johnny Appleseed/,
      exact: false,
    });
    expect(newEmployeeRow).toBeInTheDocument();
  });

  it("resets modal form fields when closed", async () => {
    render(<EmployeesWrapper />);

    const addButton = screen.getByText(/add team member/i);

    fireEvent.click(addButton);

    const modal = await screen.findByRole("dialog");
    const cancelButton = within(modal).getByText(/Cancel/i);

    const modalNameInput = await screen.findByPlaceholderText(/name/i);
    fireEvent.change(modalNameInput, {
      target: { value: "Johnny Appleseed" },
    });
    expect(modalNameInput).toHaveValue("Johnny Appleseed");

    fireEvent.click(cancelButton);

    await waitFor(() => expect(modal).not.toBeInTheDocument());

    fireEvent.click(addButton);

    const modalNameInput2 = await screen.findByPlaceholderText(/name/i);
    expect(modalNameInput2).toHaveValue("");
  });

  // it("Edits employee", async () => {
  //   render(<EmployeesWrapper />);

  //   await screen.findAllByRole("button", {
  //     name: "Edit Member",
  //     exact: false,
  //   });
  //   const memberRows = await screen.findAllByRole("row");
  //   const editMember = await within(memberRows[1]).findByLabelText(
  //     "Edit Member",
  //   );
  //   //before we edit Employee to add this skill, they do not have it.
  //   expect(within(memberRows[1]).queryByText("Design")).not.toBeInTheDocument();

  //   fireEvent.click(editMember);
  //   const editModal = await screen.findByRole("dialog");
  //   await screen.findByText("Edit Team Member");

  //   const reactCheckBox = within(editModal).getByLabelText("React");
  //   const projectManagementCheckbox =
  //     within(editModal).getByLabelText("Project Management");

  //   expect(reactCheckBox).toBeChecked();
  //   expect(projectManagementCheckbox).toBeChecked();

  //   const submitButton = within(editModal).getByText(/Save & Close/i);
  //   expect(submitButton).toHaveAttribute("aria-disabled", "true");

  //   fireEvent.click(within(editModal).getByLabelText("Design"));
  //   await waitFor(() => expect(submitButton).toBeEnabled());

  //   fireEvent.click(submitButton);
  //   await waitFor(() => expect(editModal).not.toBeInTheDocument());

  //   // check for toast message
  //   const toastMessage = await screen.findByText("Team member updated", {
  //     exact: false,
  //   });

  //   await waitFor(() => expect(toastMessage).not.toBeInTheDocument());

  //   const editedEmployee = await within(memberRows[1]).findByText("Design");
  //   //we now check for the same skill, and the Employee has it
  //   expect(editedEmployee).toBeInTheDocument();
  // });

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
  });
});
