import { render } from "@testing-library/react";
import { ScaffoldExtraDisplay, ScaffoldAttributeDisplay } from ".";

describe("scaffold/components/ScaffoldColumns", () => {
  describe("ScaffoldExtraDisplay", () => {
    it("works", () => {
      render(<ScaffoldExtraDisplay label="Label" render={() => <div />} />);
    });
  });

  describe("ScaffoldAttributeDisplay", () => {
    it("works", () => {
      render(<ScaffoldAttributeDisplay attribute="field" />);
    });
  });
});
