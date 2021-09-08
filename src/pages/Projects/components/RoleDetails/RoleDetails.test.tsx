import { render, screen } from "@testing-library/react";
import { projects } from "../../../../services/api/fixtures";

import RoleDetails from "./RoleDetails";

describe("Pages/Projects/components/RoleDetails", () => {
  it("works", () => {
    render(
      <RoleDetails
        role={projects[0].roles[0]}
        editRole={() => {}}
        deleteRole={() => {}}
      />,
    );

    expect(
      screen.getByText(projects[0].roles[0].startDate),
    ).toBeInTheDocument();
  });
});
