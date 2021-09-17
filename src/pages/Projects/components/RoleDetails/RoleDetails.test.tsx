import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { employeeStoreManager } from "../../../../services/api/employees/mocks";

import { projects } from "../../../../services/api/projects/fixtures";
import RoleDetails from "./RoleDetails";

describe("Pages/Projects/components/RoleDetails", () => {
  beforeEach(async () => {
    await employeeStoreManager.loadResources();
  });

  afterEach(async () => {
    await employeeStoreManager.clearResources();
  });

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

    expect(screen.getByText("Role")).toBeInTheDocument();
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
      expect(
        screen.queryByText(role.employees[0].name || "Error"),
      ).toBeVisible();
    });

    expect(screen.getByLabelText(/Role/)).toBeDisabled();

    fireEvent.focus(screen.getByTestId("role-start-date"));
    fireEvent.change(screen.getByTestId("role-start-date"), "01/23/2020");
    fireEvent.blur(screen.getByTestId("role-start-date"));
    expect(onEditMock).toHaveBeenCalled();

    fireEvent.click(await screen.getByText(/Delete/));
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
