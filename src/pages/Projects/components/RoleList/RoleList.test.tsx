import { expect } from "chai";
import { Suspense } from "react";
import { render, screen } from "@testing-library/react";

import { projects } from "@staffing/services/api/projects/fixtures";

import RoleList from "./RoleList";

describe("Pages/Projects/components/RoleLists", () => {
  it("works", () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <RoleList project={projects[0]} onEdit={jest.fn()} />
      </Suspense>,
    );

    const node = screen.getAllByText("Node");
    expect(node[0]).to.have.tagName("p");
  });
});
