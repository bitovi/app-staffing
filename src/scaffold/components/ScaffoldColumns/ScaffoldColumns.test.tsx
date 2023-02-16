import { render } from "@testing-library/react";
import { ScaffoldExtraDisplay, ScaffoldAttributeDisplay } from ".";

describe("scaffold/components/ScaffoldColumns", () => {
  describe("ScaffoldExtraDisplay", () => {
    it("works", () => {
      render(
        <ScaffoldExtraDisplay label="Label" renderValue={() => <div />} />,
      );
    });
  });

  describe("ScaffoldAttributeDisplay", () => {
    it("works", () => {
      render(<ScaffoldAttributeDisplay field="field" />);
    });
  });
});
