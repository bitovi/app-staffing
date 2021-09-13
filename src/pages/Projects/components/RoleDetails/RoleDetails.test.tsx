import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { select as selectEvent } from "react-select-event";
import { projects } from "../../../../services/api/fixtures";

import RoleDetails from "./RoleDetails";

describe("Pages/Projects/components/RoleDetails", () => {
  it("works", () => {
    const onEditMock = jest.fn();
    const onDeleteMock = jest.fn();

    render(
      <RoleDetails
        role={projects[0].roles[0]}
        editRole={onEditMock}
        deleteRole={onDeleteMock}
      />,
    );

    expect(screen.getByText("Role:")).toBeInTheDocument();
  });

  it("fires onBlur/onChange", async () => {
    const onEditMock = jest.fn();
    const onDeleteMock = jest.fn();

    const role = projects[0].roles[0];

    render(
      <RoleDetails
        role={role}
        editRole={onEditMock}
        deleteRole={onDeleteMock}
      />,
    );

    await waitFor(() => {
      expect(screen.queryByText(role.employee?.name || "Error")).toBeVisible();
    });

    await selectEvent(screen.getByLabelText(/Role/), "Angular");
    expect(onEditMock).toHaveBeenCalledTimes(1);

    await selectEvent(screen.getByTestId("role-employee"), "Paul");
    expect(onEditMock).toHaveBeenCalledTimes(2);

    fireEvent.blur(await screen.getByLabelText("Start Date:"));
    expect(onEditMock).toHaveBeenCalledTimes(3);

    fireEvent.blur(await screen.getByLabelText("End Date:"));
    expect(onEditMock).toHaveBeenCalledTimes(4);

    fireEvent.click(await screen.getByText("Delete"));
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
