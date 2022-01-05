import { render, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import parseISO from "date-fns/parseISO";

import EmployeeModal from "./EmployeeModal";
import { skills } from "../../../../services/api/skills/fixtures";

describe("EmployeeModal", () => {
  afterEach(cleanup);

  it("renders 'new employee' UI when 'employee' prop is not set", async () => {
    const { getByText, getByRole, getAllByRole, getByPlaceholderText } = render(
      <EmployeeModal
        onSave={() => Promise.resolve()}
        onClose={() => true}
        isOpen={true}
        skills={skills}
      />,
    );

    getByText("Add a New Team Member");

    const addButton = getByRole("button", { name: "Add & Close" });

    const checkboxes = getAllByRole("checkbox", { checked: false });
    const onScreenIds = Array.from(checkboxes).map(
      (checkbox) => (checkbox as HTMLInputElement).value,
    );
    const skillsIds = skills.map((skill) => skill.id);
    expect(skillsIds).toStrictEqual(onScreenIds);

    userEvent.click(checkboxes[0]);

    // With name inputed, Add & Close button is enabled
    userEvent.type(getByPlaceholderText("name"), "Johnny Appleseed");
    expect(addButton).toBeEnabled();
  });

  it("renders 'edit employee' UI when 'employee' prop is set", async () => {
    const {
      getByText,
      getByDisplayValue,
      getByRole,
      getAllByRole,
      getByTestId,
    } = render(
      <EmployeeModal
        onSave={() => Promise.resolve()}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employee={{
          id: "1",
          name: "Martin Silenus",
          startDate: parseISO("2019-01-30"),
          skills: [
            { id: "100", name: "Angular" },
            { id: "103", name: "Node" },
            { id: "104", name: "React" },
          ],
        }}
      />,
    );
    const getSaveButton = () => getByRole("button", { name: "Save & Close" });
    const getNameInput = () => getByDisplayValue("Martin Silenus");

    getByText("Edit Team Member");
    getByDisplayValue("2019-01-30");
    const nameInput = getNameInput();
    const saveButton = getSaveButton();

    // Modal will still be on the screen if the name input is emptied
    userEvent.type(getByTestId("name"), "");
    userEvent.click(saveButton);

    expect(saveButton).toBeInTheDocument();

    const selectedRoles = getAllByRole("checkbox", { checked: true });
    const ids = Array.from(selectedRoles).map(
      (checkbox) => (checkbox as HTMLInputElement).value,
    );
    expect(ids).toStrictEqual(["100", "103", "104"]);

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
        skills={skills}
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
