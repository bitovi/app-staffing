import { render } from "@testing-library/react";

import { projects } from "../../../../mocks/fixtures";
import ProjectDescription from "./ProjectDescription";

describe("Pages/Projects/components/ProjectDescriptions", () => {
  it("works", () => {
    render(<ProjectDescription project={projects[0]} />);
    expect(projects[0]?.description).toEqual(
      "Et quaerat neque eligendi. Qui et rerum ratione ducimus adipisci temporibus est. Natus illum dolorum sapiente est temporibus. Corrupti quaerat aspernatur aut.",
    );
  });
});
