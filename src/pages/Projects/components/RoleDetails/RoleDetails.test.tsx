import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { employeeStoreManager } from "../../../../services/api/employees/mocks";

import { projects } from "../../../../services/api/projects/fixtures";
import RoleDetails from "./RoleDetails";

describe("Pages/Projects/components/RoleDetails", () => {
  beforeEach(async () => {
    await employeeStoreManager.load();
  });

  afterEach(async () => {
    await employeeStoreManager.clear();
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
        screen.queryByText(role.employees[0].employee.name || "Error"),
      ).toBeVisible();
    });

    expect(screen.getByLabelText(/Role/)).toBeDisabled();

    const input = screen.getByLabelText("Start Date");
    fireEvent.focus(input);
    fireEvent.change(input, "01/23/2020");
    fireEvent.blur(input);

    expect(onEditMock).toHaveBeenCalled();

    fireEvent.click(await screen.getByText(/Delete/));
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
