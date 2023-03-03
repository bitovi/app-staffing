import { render } from "@testing-library/react";

import ScaffoldForm from ".";
import type { Schema } from "../../schemas/schemas";

const TestSchema: Schema = {
  name: "Test",
  attributes: { id: "string", name: "string" },
  displayField: "name",
  jsonApiField: "tests",
};

describe("scaffold/components/ScaffoldForm", () => {
  it("works", () => {
    render(<ScaffoldForm schema={TestSchema} routeOnSuccess={jest.fn()} />);
  });
});
