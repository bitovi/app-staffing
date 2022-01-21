import { render, waitFor } from "@testing-library/react";
import RoleModal from "./RoleModal";
import { fireEvent } from "@testing-library/dom";
import { skills } from "../../../../mocks/fixtures";
import userEvent from "@testing-library/user-event";

// jest.mock("./RoleModal", () => ({
//   submitForm: jest.fn(),
// }));

describe("Pages/Projects/components/RoleModal", () => {
  it("will not save unless startDate is filled out", async () => {
    const { getByText } = render(
      <RoleModal
        onSave={() => Promise.resolve()}
        createRole={() => Promise.resolve()}
        onClose={() => true}
        isOpen={true}
        skills={skills}
      />,
    );

    const addButton = getByText(/Save & Close/g);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(getByText(/Date is required/g)).toBeVisible();
    });
  });

  it("will save when startDate is filled out", async () => {
    const { getByText, getAllByRole, getByTestId, getByDisplayValue } = render(
      <RoleModal
        onSave={() => Promise.resolve()}
        createRole={() => Promise.resolve()}
        onClose={() => true}
        isOpen={true}
        skills={skills}
      />,
    );

    const checkboxes = getAllByRole("checkbox", { checked: false });
    const onScreenIds = Array.from(checkboxes).map(
      (checkbox) => (checkbox as HTMLInputElement).value,
    );
    const skillsIds = skills.map((skill) => skill.id);
    expect(skillsIds).toStrictEqual(onScreenIds);

    userEvent.click(checkboxes[0]);

    const datePicker = getByTestId("startDate");
    userEvent.type(datePicker, "2022-05-12");
    const chosenDate = getByDisplayValue("2022-05-12");
    fireEvent.click(chosenDate);
    expect(chosenDate).toBeInTheDocument();

    const addButton = getByText("Save & Close");
    userEvent.click(addButton);

  });
});
