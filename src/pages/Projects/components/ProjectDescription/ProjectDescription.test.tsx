import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import { projects } from "../../../../services/api/fixtures";

import ProjectDescription from "./ProjectDescription";

describe.only("Pages/Projects/components/ProjectDescriptions", () => {
  it("works", () => {
    render(<ProjectDescription project={projects[0]} onEdit={() => {}} />);

    const projectContainer = screen.getByText(/Description/i);
    expect(projectContainer).to.have.tagName("p");
  });
});
