import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { projects } from "../../../../services/api/fixtures";

import RoleDetails from "./RoleDetails";

describe("Pages/Projects/components/RoleDetails", () => {
  it("works", async () => {
    const onEditMock = jest.fn();
    const onDeleteMock = jest.fn();

    render(
      <RoleDetails
        role={projects[0].roles[0]}
        editRole={onEditMock}
        deleteRole={onDeleteMock}
      />,
    );

    expect(await screen.findByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByTestId("role-employee")).toBeInTheDocument();
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

    fireEvent.blur(await screen.getByLabelText("Start Date:"));
    expect(onEditMock).toHaveBeenCalledTimes(1);

    fireEvent.blur(await screen.getByLabelText("End Date:"));
    expect(onEditMock).toHaveBeenCalledTimes(2);

    fireEvent.click(await screen.getByText("Delete"));
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
