import DataTimelineHeader from ".";
import { TimelineRange } from "../../../services/projection";
import { render, screen } from "@testing-library/react";

describe("Components/DataTimelineHeader", function () {
  it("works", async () => {
    const timelines: TimelineRange[] = [
      {
        type: "type",
        title: "title",
        startDate: new Date(1, 2, 2022),
        endDate: new Date(1, 3, 2022),
      },
    ];
    const heading = "Department";

    render(<DataTimelineHeader timeline={timelines} heading={heading} />);

    const title = screen.getByText(heading);
    expect(title).toBeInTheDocument();
  });
});
