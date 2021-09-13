import { fireEvent, render, screen } from "@testing-library/react";
import { select as selectEvent } from "react-select-event";
import { projects } from "../../../../services/api/fixtures";

import ProjectDate from "./ProjectDate";

describe.only("Pages/Projects/components/ProjectDates", () => {
  it("works", async () => {
    const change = jest.fn();

    render(
      <ProjectDate
        title="Start Date"
        estimatedDate={projects[0].startDate}
        onChange={change}
      />,
    );

    expect(screen.getByText("Confidence:")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
  });

  it("fires onBlur/onChange", async () => {
    const change = jest.fn();

    render(
      <ProjectDate
        title="Start Date"
        estimatedDate={projects[0].startDate}
        onChange={change}
      />,
    );

    fireEvent.blur(await screen.findByLabelText("Start Date"));
    expect(change).toHaveBeenCalledTimes(1);

    await selectEvent(screen.getByLabelText(/Confidence/), "20%");
    // fireEvent.change(await screen.findByLabelText("Confidence:"));
    expect(change).toHaveBeenCalledTimes(2);
  });
});
