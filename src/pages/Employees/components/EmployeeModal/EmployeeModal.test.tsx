import { cleanup, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";

import EmployeeModal from "./EmployeeModal";
import { clearFixtures, loadFixtures } from "../../../../mocks";
import { skills, employees } from "../../../../mocks/fixtures";

describe("EmployeeModal", () => {
  beforeEach(async () => {
    await loadFixtures();
  });

  afterEach(async () => {
    await clearFixtures();
    cleanup();
  });

  it("renders 'new employee' UI when 'employee' prop is not set", async () => {
    const { getByText, getByRole, findAllByRole, getByPlaceholderText } =
      render(
        <EmployeeModal
          onSave={() => Promise.resolve()}
          onClose={() => true}
          isOpen
        />,
      );

    getByText("Add a New Team Member");

    const addButton = getByRole("button", { name: "Add & Close" });
    expect(addButton).toHaveAttribute("aria-disabled", "true");

    const checkboxes = await findAllByRole("checkbox", { checked: false });
    const onScreenIds = Array.from(checkboxes).map(
      (checkbox) => (checkbox as HTMLInputElement).value,
    );
    const skillsIds = skills.map((skill) => skill.id);
    expect(skillsIds).toStrictEqual(onScreenIds);

    userEvent.click(checkboxes[0]);

    // Add & Close button still disabled when at least one role is selected
    // but name is not inputed
    expect(addButton).toHaveAttribute("aria-disabled", "true");

    // With name inputed, Add & Close button is enabled
    userEvent.type(getByPlaceholderText("name"), "Johnny Appleseed");
    expect(addButton).toBeEnabled();
  });

  // This test randomly fails for taking too long
  it.skip("renders 'edit employee' UI when 'employee' prop is set", async () => {
    const employee = employees[1];

    const { getByText, getByDisplayValue, getByRole, findAllByRole } = render(
      <ChakraProvider>
        <EmployeeModal
          onSave={() => Promise.resolve()}
          onClose={() => true}
          isOpen={true}
          employee={employee}
        />
      </ChakraProvider>,
    );

    expect(getByText("Edit Team Member")).toBeInTheDocument();

    const getSaveButton = () => getByRole("button", { name: "Save & Close" });
    const getNameInput = () => getByDisplayValue(employee.name);

    const nameInput = getNameInput();
    const saveButton = getSaveButton();

    const selectedRoles = await findAllByRole("checkbox", { checked: true });
    const ids = selectedRoles.map(
      (checkbox) => (checkbox as HTMLInputElement).value,
    );

    expect(ids.sort()).toStrictEqual(
      employee.skills.map(({ id }) => id).sort(),
    );

    // Save button should appear disabled if user has not edited the form
    expect(saveButton).toHaveAttribute("aria-disabled", "true");

    // Save button must be enabled as soon as the user modifies any input
    userEvent.click(nameInput);
    userEvent.type(nameInput, "Het Masteen");

    expect(saveButton).toBeEnabled();
    userEvent.click(saveButton);

    // Save button will be in "pending" state when clicked
    await waitFor(() => {
      expect(getByText("Adding team member")).toBeInTheDocument();
    });
  });

  //TODO - Fix for SKILLSCARD
  it("should reset form fields when cancel button is clicked", async () => {
    const { getByText, getByRole, findAllByRole, getByPlaceholderText } =
      render(
        <EmployeeModal
          onSave={() => Promise.resolve()}
          onClose={() => true}
          isOpen={true}
        />,
      );

    // make sure the form is empty on open
    getByText("Add a New Team Member");

    const nameInput = getByPlaceholderText("name");
    expect(nameInput).toHaveValue("");

    const checkboxes = await findAllByRole("checkbox");
    const isChecked = (el: unknown) => (el as HTMLInputElement).checked;
    expect(checkboxes.filter(isChecked)).toHaveLength(0);

    // input some data
    userEvent.type(nameInput, "Thomas Anderson");
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);

    // make sure the form fields are properly updated
    expect(nameInput).toHaveValue("Thomas Anderson");
    expect(checkboxes.filter(isChecked)).toHaveLength(2);

    // click cancel button
    const cancelButton = getByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeEnabled();
    userEvent.click(cancelButton);

    // make sure form fields do not show old values
    expect(nameInput).toHaveValue("");
    expect(checkboxes.filter(isChecked)).toHaveLength(0);
  });

  //TODO _ fix for SKILLSCARD
  // This allows the front end to "remove" an existing date value from a team member
  it("should call onSave with date fields set to null when fields are empty", async () => {
    const onSave = jest.fn();

    const {
      getByText,
      getByRole,
      findAllByRole,
      getByPlaceholderText,
      findByText,
    } = render(<EmployeeModal isOpen onSave={onSave} onClose={() => true} />);

    getByText("Add a New Team Member");

    const addButton = getByRole("button", { name: "Add & Close" });
    expect(addButton).toHaveAttribute("aria-disabled", "true");

    const checkboxes = await findAllByRole("checkbox", { checked: false });
    userEvent.type(getByPlaceholderText("name"), "Johnny Appleseed");
    userEvent.click(checkboxes[0]);
    expect(addButton).not.toHaveAttribute("aria-disabled", "true");

    userEvent.click(addButton);
    await findByText(/Adding team member/i);

    expect(onSave).toHaveBeenCalledTimes(1);
    const employeeToSave = onSave.mock.calls[0][0];
    expect(employeeToSave.startDate).toBeNull();
    expect(employeeToSave.endDate).toBeNull();
  });
});
