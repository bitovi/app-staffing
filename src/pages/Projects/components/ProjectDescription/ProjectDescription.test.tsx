import { render, screen, fireEvent } from "@testing-library/react";

import { projects } from "../../../../services/api/mocks/projects/fixtures";
import ProjectDescription from "./ProjectDescription";

describe("Pages/Projects/components/ProjectDescriptions", () => {
  it("works", () => {
    const onEditMock = jest.fn();

    render(<ProjectDescription project={projects[0]} onEdit={onEditMock} />);
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(projects[0].name)).toBeInTheDocument();
  });

  it("fires onBlur", async () => {
    const onEditMock = jest.fn();

    render(<ProjectDescription project={projects[0]} onEdit={onEditMock} />);

    fireEvent.blur(await screen.getByDisplayValue(projects[0].name));
    expect(onEditMock).toHaveBeenCalledTimes(1);

    fireEvent.blur(await screen.findByText(projects[0].description));
    expect(onEditMock).toHaveBeenCalledTimes(2);
  });
});
