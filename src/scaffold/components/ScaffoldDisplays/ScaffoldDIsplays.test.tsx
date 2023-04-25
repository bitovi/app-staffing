import { render } from "@testing-library/react";
import {
  ScaffoldExtraDisplay,
  ScaffoldAttributeDisplay,
  ScaffoldAttributeField,
} from ".";

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

  describe("ScaffoldAttributeField", () => {
    it("works", () => {
      render(<ScaffoldAttributeField attribute="field" render={jest.fn()} />);
    });
  });
});
