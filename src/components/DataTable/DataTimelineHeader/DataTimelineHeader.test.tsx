import DataTimelineHeader from ".";
import { TimelineRange } from "../../../services/projection";
import { render, screen } from "@testing-library/react";

describe("Components/DataTimelineHeader", function () {
  it("works", async () => {
    const timelines: TimelineRange[] = [
      {
        startDate: new Date("2022-06-27T16:35:40.727Z"),
        endDate: new Date("2022-07-04T16:35:40.726Z"),
        type: "week",
        title: "Jun 27th",
      },
      {
        startDate: new Date("2022-07-04T16:35:40.727Z"),
        endDate: new Date("2022-07-11T16:35:40.726Z"),
        type: "week",
        title: "Jul 4th",
      },
      {
        startDate: new Date("2022-07-11T16:35:40.727Z"),
        endDate: new Date("2022-07-18T16:35:40.726Z"),
        type: "week",
        title: "Jul 11th",
      },

      {
        startDate: new Date("2023-01-02T06:00:00.000Z"),
        endDate: new Date("2023-04-03T04:59:59.999Z"),
        type: "quarter",
        title: "Q1 2023",
      },
    ];
    const heading = "Department";

    render(<DataTimelineHeader timeline={timelines} heading={heading} />);

    const headingDom = screen.getByText(heading);
    expect(headingDom).toBeInTheDocument();

    const titleDom = screen.getByText(timelines[0].title);
    expect(titleDom).toBeInTheDocument();

    const titleDom1 = screen.getByText(timelines[1].title);
    expect(titleDom1).toBeInTheDocument();

    const titleDom2 = screen.getByText(timelines[2].title);
    expect(titleDom2).toBeInTheDocument();

    const titleDom3 = screen.getByText(timelines[3].title);
    expect(titleDom3).toBeInTheDocument();
  });
});
