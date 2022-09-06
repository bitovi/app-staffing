import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";

import SkillModal from "./SkillModal";
import { skills } from "../../../../mocks/fixtures";

describe("SkillModal", () => {
  it("renders 'new skill' UI when 'skill' prop is not set", async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <SkillModal
        onSave={() => Promise.resolve()}
        onClose={() => true}
        isOpen
      />,
    );

    getByText("Add a New Skill");

    const addButton = getByRole("button", { name: "Add & Close" });
    expect(addButton).toHaveAttribute("aria-disabled", "true");

    // With name inputed, Add & Close button is enabled
    userEvent.type(getByPlaceholderText("name"), "SciFi Design");
    expect(addButton).toBeEnabled();
  });

  it("renders 'edit skill' UI when 'skill' prop is set", async () => {
    const skill = skills[1];

    const { getByText, getByDisplayValue, getByRole } = render(
      <ChakraProvider>
        <SkillModal
          onSave={() => Promise.resolve()}
          onClose={() => true}
          isOpen={true}
          skill={skill}
        />
      </ChakraProvider>,
    );

    expect(getByText("Edit Skill")).toBeInTheDocument();

    const getSaveButton = () => getByRole("button", { name: "Save & Close" });
    const getNameInput = () => getByDisplayValue(skill.name);

    const nameInput = getNameInput();
    const saveButton = getSaveButton();

    // Save button should appear disabled if user has not edited the form
    expect(saveButton).toHaveAttribute("aria-disabled", "true");

    // Save button must be enabled as soon as the user modifies any input
    userEvent.click(nameInput);
    userEvent.type(nameInput, "SciFi Engineering");

    expect(saveButton).toBeEnabled();
  });

  it("should reset form fields when cancel button is clicked", async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <SkillModal
        onSave={() => Promise.resolve()}
        onClose={() => true}
        isOpen={true}
      />,
    );

    // make sure the form is empty on open
    getByText("Add a New Skill");

    const nameInput = getByPlaceholderText("name");
    expect(nameInput).toHaveValue("");

    // input some data
    userEvent.type(nameInput, "Metacortex Junior Programmer");

    // make sure the form fields are properly updated
    expect(nameInput).toHaveValue("Metacortex Junior Programmer");

    // click cancel button
    const cancelButton = getByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeEnabled();
    userEvent.click(cancelButton);

    // make sure form fields do not show old values
    expect(nameInput).toHaveValue("");
  });
});
