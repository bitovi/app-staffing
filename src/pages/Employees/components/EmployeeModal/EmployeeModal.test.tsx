import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import parseISO from "date-fns/parseISO";

import EmployeeModal from "./EmployeeModal";
import { skills } from "../../../../services/api/skills/fixtures";

describe("EmployeeModal", () => {
  afterEach(cleanup);

  it("renders 'new employee' UI when 'employee' prop is not set", () => {
    const { getByText, getByRole, getAllByRole } = render(
      <EmployeeModal
        onSave={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
      />,
    );

    getByText("Add a New Team Member");

    const getAddButton = () => getByRole("button", { name: "Add & Close" });
    expect(getAddButton()).toBeDisabled();

    const checkboxes = getAllByRole("checkbox", { checked: false });
    const onScreenIds = Array.from(checkboxes).map(
      (checkbox) => (checkbox as HTMLInputElement).value,
    );
    const skillsIds = skills.map((skill) => skill.id);
    expect(skillsIds).toStrictEqual(onScreenIds);

    // Add & Close button becomes enabled when at least one role is selected
    userEvent.click(checkboxes[0]);
    expect(getAddButton()).toBeEnabled();

    // Add & Close becomes disabled if no roles are selected
    userEvent.click(checkboxes[0]);
    expect(getAddButton()).toBeDisabled();
  });

  it("renders 'edit employee' UI when 'employee' prop is set", () => {
    const { getByText, getByDisplayValue, getByRole, getAllByRole } = render(
      <EmployeeModal
        onSave={() => Promise.resolve("")}
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
    getNameInput();
    getByDisplayValue("2019-01-30");
    getSaveButton();

    const selectedRoles = getAllByRole("checkbox", { checked: true });
    const ids = Array.from(selectedRoles).map(
      (checkbox) => (checkbox as HTMLInputElement).value,
    );
    expect(ids).toStrictEqual(["100", "103", "104"]);

    // Save button must be disabled if user has not edited the form
    expect(getSaveButton()).toBeDisabled();

    // Save button must be enabled as soon as the user modifies any input
    const nameInput = getNameInput();
    userEvent.click(nameInput);
    userEvent.type(nameInput, "Het Masteen");
    expect(getSaveButton()).toBeEnabled();
  });
});