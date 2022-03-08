import { render, waitFor } from "@testing-library/react";
import RoleModal from "./RoleModal";
import { employees, skills } from "../../../../mocks/fixtures";
import userEvent from "@testing-library/user-event";

describe("Pages/Projects/components/RoleModal", () => {
  it("renders with correct default values", async function () {
    const { getByText, getByTestId, getByRole, getAllByRole } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        createAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    // check each skill has an associated radio button on screen
    const radios = await getAllByRole("radio", { checked: false });
    const onScreenIds = Array.from(radios).map(getValue);
    const skillsIds = skills.map((skill) => skill.id);
    expect(skillsIds).toStrictEqual(onScreenIds);

    const addButton = getByText(/Save & Close/g);
    expect(addButton).toHaveAttribute("aria-disabled", "true");

    const startDateInput = getByTestId("startDateInput");
    expect(getValue(startDateInput)).toEqual("");

    const endDateInput = getByTestId("endDateInput");
    expect(getValue(endDateInput)).toEqual("");

    const startConfidenceSelect = getByRole("combobox", {
      name: "Start Date Confidence",
    });
    expect(getValue(startConfidenceSelect)).toEqual("1");

    const endConfidenceSelect = getByRole("combobox", {
      name: "End Date Confidence",
    });
    expect(getValue(endConfidenceSelect)).toEqual("");
  });

  it("should NOT enable save button unless startDate is filled out", async () => {
    const { getByText } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        createAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    const addButton = getByText(/Save & Close/g);
    expect(addButton).toHaveAttribute("aria-disabled", "true");
    userEvent.click(addButton);

    await waitFor(() => {
      expect(addButton).toHaveAttribute("aria-disabled", "true");
      expect(getByText(/Date is required/g)).toBeVisible();
    });
  });

  it("should enable save button if startDate is filled out", async () => {
    const { getByText, getAllByRole, getByTestId, queryByText } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        createAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    const addButton = getByText("Save & Close");
    expect(addButton).toHaveAttribute("aria-disabled", "true");

    // select a skill
    const radios = getAllByRole("radio", { checked: false });
    userEvent.click(radios[0]);

    // select a start date
    const startDateInput = getByTestId("startDateInput");
    userEvent.type(startDateInput, "2022-05-12");

    userEvent.click(addButton);

    await waitFor(() => {
      expect(queryByText(/Date is required/g)).toBeNull();
      expect(queryByText(/Confidence is required/g)).toBeNull();
      expect(addButton).not.toHaveAttribute("aria-disabled", "true");
    });
  });

  it("should reset form fields when cancel button is clicked", async () => {
    const { getByText, getByRole, getAllByRole, getByTestId } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        createAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );
    getByText("Add a New Role");

    const addButton = getByText("Save & Close");
    expect(addButton).toHaveAttribute("aria-disabled", "true");

    const radios = getAllByRole("radio");
    const isChecked = (el: unknown) => (el as HTMLInputElement).checked;
    expect(radios.filter(isChecked)).toHaveLength(0);

    // select the skill
    userEvent.click(radios[0]);

    // select a start date
    const startDateInput = getByTestId("startDateInput");
    userEvent.type(startDateInput, "2022-05-12");

    // select end date
    const endDateInput = getByTestId("endDateInput");
    userEvent.type(endDateInput, "2022-05-12");

    // select a start confidence
    const startConfidenceSelect = getByRole("combobox", {
      name: "Start Date Confidence",
    });
    userEvent.selectOptions(startConfidenceSelect, ["0.5"]);

    // select end confidence
    const endConfidenceSelect = getByRole("combobox", {
      name: "End Date Confidence",
    });
    userEvent.selectOptions(endConfidenceSelect, ["0.1"]);

    // Make sure Add button is NOT be disabled
    expect(addButton).not.toHaveAttribute("aria-disabled", "true");

    // click cancel button
    const cancelButton = getByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeEnabled();
    userEvent.click(cancelButton);

    // make sure form fields were reset
    expect(radios.filter(isChecked)).toHaveLength(0);
    expect(getValue(startDateInput)).toEqual("");
    expect(getValue(endDateInput)).toEqual("");
    expect(getValue(startConfidenceSelect)).toEqual("1");
    expect(getValue(endConfidenceSelect)).toEqual("");
  });

  function getValue(input: HTMLElement) {
    return (input as HTMLInputElement).value;
  }
});

it("Should initially display empty team member message", async () => {
  const { getByText } = render(
    <RoleModal
      createRole={() => Promise.resolve("")}
      createAssignment={() => Promise.resolve("")}
      onClose={() => true}
      isOpen={true}
      skills={skills}
      employees={employees}
    />,
  );

  expect(
    getByText(/There are currently no team members assigned to/g),
  ).toBeInTheDocument();
});
