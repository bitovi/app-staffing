import { render, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EmployeeModal from "./EmployeeModal";
import { deserializedSkills } from "../../../../mocks/skills/fixtures";
import { getDeserializedEmployees } from "../../../../mocks/employees/fixtures";
import { ChakraProvider } from "@chakra-ui/react";

describe("EmployeeModal", () => {
  afterEach(cleanup);

  it("renders 'new employee' UI when 'employee' prop is not set", async () => {
    const { getByText, getByRole, getAllByRole, getByPlaceholderText } = render(
      <EmployeeModal
        onSave={() => Promise.resolve()}
        onClose={() => true}
        isOpen
        skills={deserializedSkills}
      />,
    );

    getByText("Add a New Team Member");

    const addButton = getByRole("button", { name: "Add & Close" });
    expect(addButton).toBeDisabled();

    const checkboxes = getAllByRole("checkbox", { checked: false });
    const onScreenIds = Array.from(checkboxes).map(
      (checkbox) => (checkbox as HTMLInputElement).value,
    );
    const skillsIds = deserializedSkills.map((skill) => skill.id);
    expect(skillsIds).toStrictEqual(onScreenIds);

    userEvent.click(checkboxes[0]);

    // Add & Close button still disabled when at least one role is selected
    // but name is not inputed
    expect(addButton).toBeDisabled();

    // With name inputed, Add & Close button is enabled
    userEvent.type(getByPlaceholderText("name"), "Johnny Appleseed");
    expect(addButton).toBeEnabled();
  });

  it("renders 'edit employee' UI when 'employee' prop is set", async () => {
    const employee = getDeserializedEmployees()[1];

    const employeeWithAllSkills = {
      ...employee,
      skills: deserializedSkills,
    };

    const { getByText, getByDisplayValue, getByRole, getAllByRole } = render(
      <ChakraProvider>
        <EmployeeModal
          onSave={() => Promise.resolve()}
          onClose={() => true}
          isOpen={true}
          skills={deserializedSkills}
          employee={employeeWithAllSkills}
        />
      </ChakraProvider>,
    );

    expect(getByText("Edit Team Member")).toBeInTheDocument();

    const getSaveButton = () => getByRole("button", { name: "Save & Close" });
    const getNameInput = () => getByDisplayValue(employee.name);

    const nameInput = getNameInput();
    const saveButton = getSaveButton();

    const selectedRoles = getAllByRole("checkbox", { checked: true });
    const ids = selectedRoles.map(
      (checkbox) => (checkbox as HTMLInputElement).value,
    );

    expect(ids.sort()).toStrictEqual(
      employeeWithAllSkills.skills.map(({ id }) => id).sort(),
    );

    // Save button must be disabled if user has not edited the form
    expect(saveButton).toBeDisabled();

    // Save button must be enabled as soon as the user modifies any input
    userEvent.click(nameInput);
    userEvent.type(nameInput, "Het Masteen");

    expect(saveButton).toBeEnabled();
    userEvent.click(saveButton);

    // Save button will be in "pending" state when clicked
    await waitFor(() => {
      expect(getByText("Saving")).toBeInTheDocument();
    });
  });

  it("should reset form fields when cancel button is clicked", async () => {
    const { getByText, getByRole, getAllByRole, getByPlaceholderText } = render(
      <EmployeeModal
        onSave={() => Promise.resolve()}
        onClose={() => true}
        isOpen={true}
        skills={deserializedSkills}
      />,
    );

    // make sure the form is empty on open
    getByText("Add a New Team Member");

    const nameInput = getByPlaceholderText("name");
    expect(nameInput).toHaveValue("");

    const checkboxes = getAllByRole("checkbox");
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
});
