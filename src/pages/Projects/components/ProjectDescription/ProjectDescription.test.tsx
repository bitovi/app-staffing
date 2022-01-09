import { render, screen, fireEvent } from "@testing-library/react";

import { projects } from "../../../../mocks/fixtures";
import ProjectDescription from "./ProjectDescription";

describe("Pages/Projects/components/ProjectDescriptions", () => {
  it("works", () => {
    const onEditMock = jest.fn();

    render(<ProjectDescription project={projects[0]} onEdit={onEditMock} />);
    expect(
      screen.getByDisplayValue(projects[0].description),
    ).toBeInTheDocument();
  });

  it("fires onBlur", async () => {
    const onEditMock = jest.fn();

    render(<ProjectDescription project={projects[0]} onEdit={onEditMock} />);

    fireEvent.blur(await screen.findByText(projects[0]?.description || ""));
    expect(onEditMock).toHaveBeenCalledTimes(1);
  });
});
