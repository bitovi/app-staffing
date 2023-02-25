import { render } from "@testing-library/react";
import ScaffoldDetailsPage from ".";
import type { Schema } from "../../schemas/schemas";

const TestSchema: Schema = {
  name: "Test",
  attributes: { id: "string", name: "string" },
  displayField: "name",
  jsonApiField: "tests",
};

describe("scaffold/components/ScaffoldDetailsPage", () => {
  describe("ScaffoldDetailsPage", () => {
    it("works", () => {
      render(<ScaffoldDetailsPage schema={TestSchema} />);
    });
  });
});
