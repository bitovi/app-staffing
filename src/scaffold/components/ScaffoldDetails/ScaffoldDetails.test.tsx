import { render } from "@testing-library/react";

import ScaffoldDetails from ".";
import type { Schema } from "../../schemas/schemas";

const TestSchema: Schema = {
  name: "Test",
  attributes: { id: "string", name: "string" },
  displayField: "name",
  jsonApiField: "tests",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

describe("scaffold/components/ScaffoldDetails", () => {
  describe("ScaffoldDetails", () => {
    it("works", () => {
      render(<ScaffoldDetails schema={TestSchema} />);
    });
  });
});
