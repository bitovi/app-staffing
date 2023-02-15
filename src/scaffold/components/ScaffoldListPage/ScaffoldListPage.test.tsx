import { render } from "@testing-library/react";
import type { Schema } from "../../schemas/schemas";
import ScaffoldListPage from "./ScaffoldListPage";

const TestSchema: Schema = {
  name: "Test",
  attributes: { id: "string", name: "string" },
  displayField: "name",
  jsonApiField: "tests",
};

describe("scaffold/components/ScaffoldListPage", () => {
  describe("ScaffoldListPage", () => {
    it("works", () => {
      render(<ScaffoldListPage schema={TestSchema} />);
    });
  });
});
