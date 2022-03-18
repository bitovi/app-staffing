import { render, waitFor, within, fireEvent } from "@testing-library/react";
import RoleModal from "./RoleModal";
import { employees, skills, roles, projects } from "../../../../mocks/fixtures";
import userEvent from "@testing-library/user-event";
import formatISO from "date-fns/formatISO";

describe("Pages/Projects/components/RoleModal", () => {
  jest.setTimeout(30000);

  it("renders with correct default values", async function () {
    const { getByText, getByTestId, getByRole, getAllByRole } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
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
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
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
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
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
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
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
    await waitFor(() => expect(radios.filter(isChecked)).toHaveLength(0));
    expect(getValue(startDateInput)).toEqual("");
    expect(getValue(endDateInput)).toEqual("");
    expect(getValue(startConfidenceSelect)).toEqual("1");
    expect(getValue(endConfidenceSelect)).toEqual("");
  });

  it("Should initially display empty team member message", async () => {
    const { getByText } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
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
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
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
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
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
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
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
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    const addButton = getByTestId("add-team-member");

    userEvent.click(addButton);

    const selectElement = getAllByLabelText("Employee Name")[0];
    selectOption(selectElement, employees[0].name, getByText);

    expect(queryByText(employees[0].name)).toBeInTheDocument();
  });

  it("selects employees and removes the right inputs when clicking on the remove button", async () => {
    const {
      getByTestId,
      getByText,
      queryByText,
      getAllByLabelText,
      getAllByTestId,
    } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
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
    selectOption(selectElement1, employees[0].name, getByText);

    const selectElement2 = getAllByLabelText("Employee Name")[1];
    selectOption(selectElement2, employees[1].name, getByText);

    const selectElement3 = getAllByLabelText("Employee Name")[2];
    selectOption(selectElement3, employees[2].name, getByText);

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

  it("works in edit mode", async () => {
    const { getByTestId, getByText, queryByText, queryByRole } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
        roleToEdit={roles[0]}
      />,
    );

    // Make sure we don't show skills selection in edit mode
    expect(queryByText(/Select Role/g)).not.toBeInTheDocument();
    expect(queryByRole("radio")).not.toBeInTheDocument();

    // make sure inputs are prefilled with role to edit data

    const startDateInput = getByTestId("startDateInput");
    expect(getValue(startDateInput)).toEqual(
      formatISO(roles[0].startDate).substring(0, 10),
    );

    const startConfidenceInput = getByTestId("startConfidenceInput");
    expect(Number(getValue(startConfidenceInput))).toEqual(
      roles[0].startConfidence,
    );

    const endDateInput = getByTestId("endDateInput");
    if (roles[0].endDate) {
      expect(getValue(endDateInput)).toEqual(
        formatISO(roles[0].endDate).substring(0, 10),
      );
    }

    const endConfidenceInput = getByTestId("endConfidenceInput");
    expect(Number(getValue(endConfidenceInput))).toEqual(
      roles[0].endConfidence,
    );

    // Make sure Add button is initially disabled
    const addButton = getByText(/Save & Close/g);
    expect(addButton).toHaveAttribute("aria-disabled", "true");

    // After the user changes an input, the button becomes enabled
    userEvent.type(startDateInput, "2035-05-12");
    expect(addButton).not.toHaveAttribute("aria-disabled", "true");

    // If user changes back to initial value, the button becomes disabled again
    userEvent.type(
      startDateInput,
      formatISO(roles[0].startDate).substring(0, 10),
    );
    expect(addButton).toHaveAttribute("aria-disabled", "true");
  });

  it("handles end date edges cases", async () => {
    const { getByTestId } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    const endDateInput = getByTestId("endDateInput");
    const endConfidenceInput = getByTestId("endConfidenceInput");

    userEvent.type(endDateInput, "2035-05-12");

    expect(Number(getValue(endConfidenceInput))).toEqual(1);

    userEvent.clear(endDateInput);

    expect(getValue(endConfidenceInput)).toEqual("");
  });

  it("handles end confidence edges cases", async () => {
    const { getByTestId } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
      />,
    );

    const endConfidenceSelect = getByTestId("endConfidenceInput");
    const endDateInput = getByTestId("endDateInput");

    userEvent.selectOptions(endConfidenceSelect, ["0.5"]);

    expect(getValue(endDateInput)).toEqual(
      formatISO(new Date()).substring(0, 10),
    );

    userEvent.selectOptions(endConfidenceSelect, [""]);

    expect(getValue(endDateInput)).toEqual("");
  });

  it("handles server errors for create role", async () => {
    const createRole = jest.fn().mockRejectedValue(new Error("Async error"));

    const { getByTestId, getByText } = render(
      <RoleModal
        createRole={createRole}
        updateRole={() => Promise.resolve()}
        createAssignment={() => Promise.resolve("")}
        updateAssignment={() => Promise.resolve()}
        destroyAssignment={() => Promise.resolve("")}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
        project={projects[0]}
      />,
    );

    const submitButton = getByText("Save & Close");

    const startDateInput = getByTestId("startDateInput");
    userEvent.type(startDateInput, "2022-05-12");

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId("serviceError")).toBeInTheDocument();
    });
  });

  it("sends the right requests when editing team members", async () => {
    const createAssignment = jest.fn().mockResolvedValue("");
    const updateAssignment = jest.fn().mockResolvedValue(undefined);
    const destroyAssignment = jest.fn().mockResolvedValue("");

    const { getByTestId, getByText, getAllByText, getAllByTestId } = render(
      <RoleModal
        createRole={() => Promise.resolve("")}
        updateRole={() => Promise.resolve()}
        createAssignment={createAssignment}
        updateAssignment={updateAssignment}
        destroyAssignment={destroyAssignment}
        onClose={() => true}
        isOpen={true}
        skills={skills}
        employees={employees}
        project={projects[0]}
        roleToEdit={roles[0]}
      />,
    );

    const submitButton = getByText("Save & Close");
    const addTeamMemberButton = getByTestId("add-team-member");

    const startDateInput = getByTestId("startDateInput");
    userEvent.type(startDateInput, "2022-05-12");

    const teamMemberRows = getAllByTestId("team-member-row");
    const assignmentStartDateInput = within(teamMemberRows[0]).getByLabelText(
      "Start Date",
    );
    userEvent.type(assignmentStartDateInput, "2022-05-12");

    const selectElement1 = within(teamMemberRows[0]).getByLabelText(
      "Employee Name",
    );
    selectOptionMultiple(selectElement1, employees[0].name, getAllByText);

    userEvent.click(addTeamMemberButton);
    userEvent.click(addTeamMemberButton);

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(updateAssignment).toBeCalledTimes(1);
      expect(createAssignment).toBeCalledTimes(2);
      expect(destroyAssignment).toBeCalledTimes(0);
    });
  });

  it("successfully destroys assignment and send other update requests", async () => {
    const createAssignment = jest.fn().mockResolvedValue("");
    const updateAssignment = jest.fn().mockResolvedValue(undefined);
    const destroyAssignment = jest.fn().mockResolvedValue("");

    const { getByTestId, getByText, getAllByTestId } = render(
      <>
        <RoleModal
          createRole={() => Promise.resolve("")}
          updateRole={() => Promise.resolve()}
          createAssignment={createAssignment}
          updateAssignment={updateAssignment}
          destroyAssignment={destroyAssignment}
          onClose={() => true}
          isOpen={true}
          skills={skills}
          employees={employees}
          project={projects[0]}
          roleToEdit={roles[1]}
        />
      </>,
    );

    const submitButton = getByText("Save & Close");
    const addTeamMemberButton = getByTestId("add-team-member");

    const startDateInput = getByTestId("startDateInput");
    userEvent.type(startDateInput, "2022-05-12");

    const teamMemberRows = getAllByTestId("team-member-row");
    const removeTeamMemberButton = within(teamMemberRows[0]).getByTestId(
      "remove-team-member",
    );
    userEvent.click(removeTeamMemberButton);

    userEvent.click(addTeamMemberButton);
    userEvent.click(addTeamMemberButton);

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(updateAssignment).toBeCalledTimes(0);
      expect(destroyAssignment).toBeCalledTimes(1);
      expect(createAssignment).toBeCalledTimes(2);
    });
  });

  function getValue(input: HTMLElement) {
    return (input as HTMLInputElement).value;
  }

  const selectOption = (
    selectElement: HTMLElement,
    option: string,
    getByText: (arg0: string) => Document | Node | Element | Window,
  ) => {
    fireEvent.focus(selectElement);
    fireEvent.keyDown(selectElement, { key: "ArrowDown", code: 40 });
    fireEvent.click(getByText(option));
  };

  const selectOptionMultiple = (
    selectElement: HTMLElement,
    option: string,
    getAllByText: (arg0: string) => Document[] | Node[] | Element[] | Window[],
  ) => {
    fireEvent.focus(selectElement);
    fireEvent.keyDown(selectElement, { key: "ArrowDown", code: 40 });
    fireEvent.click(getAllByText(option)[0]);
  };
});
