import { render } from "@testing-library/react";
import { ScaffoldExtraColumn, ScaffoldFieldColumn } from ".";

describe("scaffold/components/ScaffoldColumns", () => {
  describe("ScaffoldExtraColumn", () => {
    it("works", () => {
      render(<ScaffoldExtraColumn label="Label" renderValue={() => <div />} />);
    });
  });

  describe("ScaffoldFieldColumn", () => {
    it("works", () => {
      render(<ScaffoldFieldColumn field="field" />);
    });
  });
});
