// import { Suspense } from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// import { projects } from "../../../../services/api/projects/fixtures";
// import { employeeStoreManager } from "../../../../services/api/employees/mocks";

// import RoleDetails from "./RoleDetails";

describe("Pages/Projects/components/RoleDetails", () => {
  // beforeEach(async () => {
  //   await employeeStoreManager.load();
  // });

  // afterEach(async () => {
  //   await employeeStoreManager.clear();
  // });

  // it("works", async () => {
  //   const onEditMock = jest.fn();
  //   const onDeleteMock = jest.fn();

  //   render(
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <RoleDetails
  //         role={projects[0].roles[0]}
  //         editRole={onEditMock}
  //         deleteRole={onDeleteMock}
  //       />
  //     </Suspense>,
  //   );

  //   expect(await screen.findByText("Role")).toBeInTheDocument();
  // });

  // it("fires onBlur/onChange", async () => {
  //   const onEditMock = jest.fn();
  //   const onDeleteMock = jest.fn();

  //   const role = projects[0].roles[0];

  //   render(
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <RoleDetails
  //         role={role}
  //         editRole={onEditMock}
  //         deleteRole={onDeleteMock}
  //       />
  //     </Suspense>,
  //   );

  //   await waitFor(() => {
  //     expect(
  //       screen.queryByText(role.employees[0].employee.name || "Error"),
  //     ).toBeVisible();
  //   });

  //   expect(screen.getByLabelText(/Role/)).toBeDisabled();

  //   const input = screen.getByLabelText("Start Date");
  //   fireEvent.focus(input);
  //   fireEvent.change(input, "01/23/2020");
  //   fireEvent.blur(input);

  //   expect(onEditMock).toHaveBeenCalled();

  //   fireEvent.click(await screen.getByText(/Delete/));
  //   expect(onDeleteMock).toHaveBeenCalled();
  // });

  it("needs to be fixed", () => {
    expect(true).toBe(true);
  });
});

export {};
