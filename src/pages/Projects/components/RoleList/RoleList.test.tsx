import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import { projects } from "../../../../shared/services/api/projects/fixtures";
import RoleList from "./RoleList";

describe("Pages/Projects/components/RoleLists", () => {
  it("works", () => {
    render(<RoleList project={projects[0]} onEdit={jest.fn()} />);

    const node = screen.getAllByText("Node");
    expect(node[0]).to.have.tagName("p");
  });
});
