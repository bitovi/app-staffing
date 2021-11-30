import { fireEvent, render, screen, act } from "@testing-library/react";
import { Role } from "../../../../services/api";

import RoleModal from ".";
import { resolve } from "dns";

const skills = [
  {
    id: "101",
    name: "Angular",
  },
  {
    id: "102",
    name: "Design",
  },
];

describe("Components/RoleModal", () => {
  it("works", async () => {
    const newRole: Role = {
      id: "1",
      skill: skills[0],
      startDate: {
        date: new Date(),
        confidence: "50%",
      },
      endDate: {
        date: new Date(),
        confidence: "50%",
      },
      projectId: "1001",
    };
    const onCancel = jest.fn();
    const onSave = jest.fn();
    render(
      <RoleModal
        isOpen={true}
        onClose={onCancel}
        onSave={onSave(newRole)}
        skills={skills}
        projectId={"1001"}
      />,
    );

    const roleSelection = screen.getByRole("radio", { name: "Angular" });
    const startDate = screen.getByTitle("StartDate");
    const startConfidence = screen.getByTitle("StartConfidence");
    const saveButton = screen.getByText("Save & Close");
    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(roleSelection);
    fireEvent.change(startDate, { target: { value: new Date() } });
    fireEvent.change(startConfidence, { target: { value: "20%" } });
    await act(async () => {
      fireEvent.click(saveButton);
      fireEvent.click(cancelButton);
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("If role is empty, disabled save button", async () => {
    const { rerender } = render(
      <RoleModal
        isOpen={true}
        onClose={jest.fn()}
        onSave={jest.fn()}
        skills={skills}
        projectId={"1001"}
      />,
    );

    const saveButton = screen.getByRole("button", {
      name: "save button",
    });

    fireEvent.click(saveButton);

    rerender(
      <RoleModal
        isOpen={true}
        onClose={jest.fn()}
        onSave={jest.fn()}
        skills={skills}
        projectId={"1001"}
      />,
    );

    expect(saveButton).toBeDisabled();
  });
});
