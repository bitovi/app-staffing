import { render } from "@testing-library/react";
import type { Schema } from "../../schemas/schemas";
import ScaffoldList from "./ScaffoldList";

const TestSchema: Schema = {
  name: "Test",
  attributes: { id: "string", name: "string" },
  displayField: "name",
  jsonApiField: "tests",
};

describe("scaffold/components/ScaffoldList", () => {
  describe("ScaffoldLiScaffoldListstPage", () => {
    it("works", () => {
      render(<ScaffoldList schema={TestSchema} />);
    });
  });
});
