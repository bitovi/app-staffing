import { render, screen, fireEvent } from "@testing-library/react";

import { projects } from "../../../../mocks/fixtures";
import ProjectDescription from "./ProjectDescription";

describe("Pages/Projects/components/ProjectDescriptions", () => {
  it("works", () => {
    const onEditMock = jest.fn();

    render(<ProjectDescription project={projects[0]} onEdit={onEditMock} />);
    expect(projects[0]?.description).toEqual(
      "Et quaerat neque eligendi. Qui et rerum ratione ducimus adipisci temporibus est. Natus illum dolorum sapiente est temporibus. Corrupti quaerat aspernatur aut.",
    );
  });

  it("fires onBlur", async () => {
    const onEditMock = jest.fn();

    render(<ProjectDescription project={projects[0]} onEdit={onEditMock} />);

    fireEvent.blur(await screen.findByText(projects[0]?.description || ""));
    expect(onEditMock).toHaveBeenCalledTimes(1);
  });
});
