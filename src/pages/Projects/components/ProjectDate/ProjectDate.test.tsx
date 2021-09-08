import { render, screen } from "@testing-library/react";
import { projects } from "../../../../services/api/fixtures";

import ProjectDate from "./ProjectDate";

describe.only("Pages/Projects/components/ProjectDates", () => {
  it("works", () => {
    const change = jest.fn();

    render(
      <ProjectDate
        title="Start Date"
        estimatedDate={projects[0].startDate}
        onChange={change}
      />,
    );

    expect(screen.getByText("Confidence:")).toBeInTheDocument();
  });
});
