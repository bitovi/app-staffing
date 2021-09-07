import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import { projects } from "../../../../services/api/fixtures";

import ProjectDate from "./ProjectDate";

describe.only("Pages/Projects/components/ProjectDates", () => {
  it("works", () => {
    render(
      <ProjectDate
        title="Start Date"
        estimatedDate={projects[0].startDate}
        onConfidenceSelect={() => {}}
        onDateChange={() => {}}
      />,
    );

    const projectContainer = screen.getByText(/Confidence/i);
    expect(projectContainer).to.have.tagName("label");
  });
});
