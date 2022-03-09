import { render, waitFor, within, fireEvent } from "@testing-library/react";
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

  it("adds a team member input when clicking on the add button and removes the empty message", async () => {
    const { getByTestId, getAllByTestId, queryByText } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        createAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    const addButton = getByTestId("add-team-member");
    userEvent.click(addButton);

    expect(
      queryByText(/There are currently no team members assigned to/g),
    ).not.toBeInTheDocument();

    const teamMemberRow = getAllByTestId("team-member-row");

    expect(teamMemberRow.length).toEqual(1);
  });

  it("has the correct form labels", async () => {
    const { getByTestId, getAllByTestId } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        createAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    const addButton = getByTestId("add-team-member");
    userEvent.click(addButton);

    const teamMemberRow = getAllByTestId("team-member-row");

    within(teamMemberRow[0]).queryByText(/'Employee Name'/g);
    within(teamMemberRow[0]).queryByText(/'Start Date'/g);
    within(teamMemberRow[0]).queryByText(/'End Date'/g);
  });

  it("correctly adds and remove team members input with the add and remove buttons", async () => {
    const { getByTestId, getAllByTestId } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        createAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    const addButton = getByTestId("add-team-member");

    userEvent.click(addButton);

    let teamMemberRow = getAllByTestId("team-member-row");

    expect(teamMemberRow.length).toEqual(1);

    userEvent.click(addButton);
    userEvent.click(addButton);

    teamMemberRow = getAllByTestId("team-member-row");

    expect(teamMemberRow.length).toEqual(3);

    const removeButton = getAllByTestId("remove-team-member")[0];

    userEvent.click(removeButton);

    teamMemberRow = getAllByTestId("team-member-row");

    expect(teamMemberRow.length).toEqual(2);
  });

  it("selects employees", async () => {
    const { getByTestId, getByText, queryByText, getAllByLabelText } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        createAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    const addButton = getByTestId("add-team-member");

    userEvent.click(addButton);

    const selectElement = getAllByLabelText("Employee Name")[0];

    const selectItem = getSelectItem(selectElement, getByText);

    await selectItem(employees[0].name);

    expect(queryByText(employees[0].name)).toBeInTheDocument();
  });

  it("selects employees and removes the right inputs when clickng on the remove button", async () => {
    const {
      getByTestId,
      getByText,
      queryByText,
      getAllByLabelText,
      getAllByTestId,
    } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        createAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    const addButton = getByTestId("add-team-member");

    userEvent.click(addButton);
    userEvent.click(addButton);
    userEvent.click(addButton);

    const selectElement1 = getAllByLabelText("Employee Name")[0];
    const selectElement2 = getAllByLabelText("Employee Name")[1];
    const selectElement3 = getAllByLabelText("Employee Name")[2];

    const selectItem1 = getSelectItem(selectElement1, getByText);
    const selectItem2 = getSelectItem(selectElement2, getByText);
    const selectItem3 = getSelectItem(selectElement3, getByText);

    await selectItem1(employees[0].name);
    await selectItem2(employees[1].name);
    await selectItem3(employees[2].name);

    expect(queryByText(employees[0].name)).toBeInTheDocument();
    expect(queryByText(employees[1].name)).toBeInTheDocument();
    expect(queryByText(employees[2].name)).toBeInTheDocument();

    const removeButton = getAllByTestId("remove-team-member");
    userEvent.click(removeButton[1]);

    expect(queryByText(employees[1].name)).not.toBeInTheDocument();

    userEvent.click(removeButton[0]);

    expect(queryByText(employees[0].name)).not.toBeInTheDocument();
    expect(queryByText(employees[2].name)).toBeInTheDocument();
  });

  function getValue(input: HTMLElement) {
    return (input as HTMLInputElement).value;
  }

  const getSelectItem =
    (
      selectElement: HTMLElement,
      getByText: (arg0: string) => Document | Node | Element | Window,
    ) =>
    async (itemText: string) => {
      const DOWN_ARROW = { keyCode: 40 };
      fireEvent.keyDown(selectElement, DOWN_ARROW);
      await waitFor(() => getByText(itemText));
      fireEvent.click(getByText(itemText));
    };
});
