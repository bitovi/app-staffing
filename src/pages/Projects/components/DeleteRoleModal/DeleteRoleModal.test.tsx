import faker from "faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import DeleteRoleModal from ".";

describe("Pages/Projects/Components/DeleteRoleModal", () => {
  const role = {
    id: "test",
    startDate: faker.date.recent(),
    startConfidence: 1,
    project: { id: "project1", name: "project1" },
    skills: [{ id: "1001", name: "React" }],
  };
  it("renders", async () => {
    render(
      <DeleteRoleModal
        roleToDelete={role}
        setRole={() => undefined}
        destroyRole={() => undefined}
      />,
    );

    expect(screen.getByText(/Delete Role/g)).toBeInTheDocument();
    expect(screen.getByText(/Delete & Close/g)).toBeInTheDocument();
  });

  it("does not open if selected role is null", async () => {
    render(
      <DeleteRoleModal
        roleToDelete={null}
        setRole={() => undefined}
        destroyRole={() => undefined}
      />,
    );

    expect(screen.queryByText(/Delete Role/g)).not.toBeInTheDocument();
  });

  it("closes after deleting role", async () => {
    render(
      <DeleteRoleModal
        roleToDelete={role}
        setRole={() => undefined}
        destroyRole={() => undefined}
      />,
    );

    act(() => {
      fireEvent.click(screen.getByText(/Delete & Close/g));
    });

    await waitFor(() =>
      expect(screen.queryByText(/Delete Role/g)).toBeInTheDocument(),
    );
  });

  it("closes after click on cancel", async () => {
    render(
      <DeleteRoleModal
        roleToDelete={role}
        setRole={() => undefined}
        destroyRole={() => undefined}
      />,
    );

    act(() => {
      fireEvent.click(screen.getByText(/Cancel/g));
    });

    await waitFor(() =>
      expect(screen.queryByText(/Delete Role/g)).toBeInTheDocument(),
    );
  });
});
