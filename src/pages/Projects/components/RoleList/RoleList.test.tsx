import { render, screen } from "@testing-library/react";
import { expect } from "chai";

import { projects } from "../../../../services/api/projects/fixtures";
import RoleList from "./RoleList";

describe("Pages/Projects/components/RoleLists with roles", () => {
  it("works", () => {
    render(<RoleList project={projects[0]} onEdit={jest.fn()} />);

    const node = screen.getAllByText("Node");
    expect(node[0]).to.have.tagName("p");
  });
});

describe("Pages/Projects/components/RoleLists Empty roles", () => {
  it("works", () => {
    projects[0].roles = [];
    render(<RoleList project={projects[0]} onEdit={jest.fn()} />);
    expect(document.getElementsByClassName("noRoles").length).to.equal(1);
  });
});
