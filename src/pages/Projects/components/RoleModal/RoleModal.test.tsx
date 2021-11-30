import { fireEvent, render, screen, act } from "@testing-library/react";

import RoleModal from ".";

const skills = [
  {
    id: '101',
    name: 'Angular',
  },
  {
    id: '102',
    name: 'Design',
  },
]



describe("Components/RoleModal", () => {

  it("works", async () => {
    const onCancel = jest.fn();
    const onSave = jest.fn();
    render(
      <RoleModal
        isOpen={true}
        onClose={onCancel}
        onSave={onSave}
        skills={skills}
        projectId={"1001"}
      />,
    );

    const roleSelection = screen.getByRole('radio', {name: "Angular"});
    const startDate = screen.getByTitle("StartDate");
    const startConfidence = screen.getByTitle("StartConfidence");
    const saveButton = screen.getByTitle("SaveButton");
    const cancelButton = screen.getByText("Cancel");

    await act(async() => {
      fireEvent.click(roleSelection);
      fireEvent.change(startDate, { target: { value: new Date()}});
      fireEvent.change(startConfidence, { target: {value: "20%" }});
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