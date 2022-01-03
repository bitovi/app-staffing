import { fireEvent, render, screen } from "@testing-library/react";
import { select as selectEvent } from "react-select-event";

// Fixtures are populated through the employee generator. So in order to get role fixtures
// employee needs to be added here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { employees } from "../../../../mocks";
import { getDeserializedRoles } from "../../../../mocks/roles/fixtures";
import RoleDate from "./RoleDate";

describe("Pages/Projects/components/RoleDates", () => {
  it("works", async () => {
    const role = getDeserializedRoles()[0];

    render(
      <RoleDate
        title="Start Date"
        date={role.startDate}
        confidence={role.confidence}
        onConfidenceChange={jest.fn()}
        onDateChange={jest.fn()}
      />,
    );

    expect(screen.getByText("Confidence:")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
  });

  it("fires onBlur/onChange", async () => {
    const change = jest.fn();
    const role = getDeserializedRoles()[0];

    render(
      <RoleDate
        title="Start Date"
        date={role.startDate}
        confidence={role.confidence}
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
