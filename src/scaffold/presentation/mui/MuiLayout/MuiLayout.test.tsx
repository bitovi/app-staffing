import { render, screen } from "@testing-library/react";
import MuiLayout from ".";
import type { Schema } from "../../../schemas/schemas";

const TestSchema: Schema = {
  name: "Test",
  attributes: { id: "string", name: "string" },
  displayField: "name",
  jsonApiField: "tests",
};

describe("scaffold/presentation/mui/MuiLayout", () => {
  describe("MuiLayout", () => {
    it("works", async () => {
      render(<MuiLayout schema={TestSchema} />);
      expect(await screen.findByText("Test")).toBeInTheDocument();
    });
  });
});
