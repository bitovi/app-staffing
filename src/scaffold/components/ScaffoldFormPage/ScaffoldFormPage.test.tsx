import { render } from "@testing-library/react";
import ScaffoldFormPage from ".";
import type { Schema } from "../../schemas/schemas";

const TestSchema: Schema = {
  name: "Test",
  attributes: { id: "string", name: "string" },
  displayField: "name",
  jsonApiField: "tests",
};

describe("scaffold/components/ScaffoldFormPage", () => {
  it("works", () => {
    render(<ScaffoldFormPage schema={TestSchema} routeOnSuccess={jest.fn()} />);
  });
});
