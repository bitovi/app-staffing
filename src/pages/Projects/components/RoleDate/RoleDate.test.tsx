import { fireEvent, render, screen } from "@testing-library/react";
import { projects } from "../../../../services/api/fixtures";

import RoleDate from "./RoleDate";

describe.only("Pages/Projects/components/RoleDates", () => {
  it("works", async () => {
    const change = jest.fn();

    render(
      <RoleDate
        title="Start Date"
        estimatedDate={projects[0].roles[0].startDate}
        onChange={change}
      />,
    );

    expect(screen.getByText("Confidence:")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
  });

  it("fires onBlur/onChange", async () => {
    const change = jest.fn();

    render(
      <RoleDate
        title="Start Date"
        estimatedDate={projects[0].roles[0].startDate}
        onChange={change}
      />,
    );

    fireEvent.blur(await screen.findByLabelText("Start Date"));
    expect(change).toHaveBeenCalledTimes(1);

    fireEvent.change(await screen.findByLabelText("Confidence:"));
    expect(change).toHaveBeenCalledTimes(2);
  });
});
