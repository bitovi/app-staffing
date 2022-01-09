import { fireEvent, render, screen } from "@testing-library/react";
import { select as selectEvent } from "react-select-event";

import { roles } from "../../../../mocks/fixtures";
import RoleDate from "./RoleDate";

describe("Pages/Projects/components/RoleDates", () => {
  it("works", async () => {
    const role = roles[0];

    render(
      <RoleDate
        title="Start Date"
        date={role.startDate}
        confidence={role.startConfidence}
        onConfidenceChange={jest.fn()}
        onDateChange={jest.fn()}
      />,
    );

    expect(screen.getByText("Confidence:")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
  });

  it("fires onBlur/onChange", async () => {
    const change = jest.fn();
    const role = roles[0];

    render(
      <RoleDate
        title="Start Date"
        date={role.startDate}
        confidence={role.startConfidence}
        onConfidenceChange={change}
        onDateChange={change}
      />,
    );

    fireEvent.blur(await screen.findByLabelText("Start Date"));
    expect(change).toHaveBeenCalledTimes(1);

    await selectEvent(screen.getByLabelText(/Confidence/), "50%");
    expect(change).toHaveBeenCalledTimes(2);
  });
});
