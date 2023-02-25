import { render, screen } from "@testing-library/react";
import { Relationship, RelationshipList } from ".";

describe("scaffold/presentation/mui/MuiProvider/DefaultComponents", () => {
  describe("Relationship", () => {
    it("works", async () => {
      render(<Relationship value={{ id: "1", label: "label-1" }} />);
      expect(await screen.findByText("label-1")).toBeInTheDocument();
    });
  });

  describe("RelationshipList", () => {
    it("works", async () => {
      render(
        <RelationshipList
          values={[
            { id: "1", label: "label-1" },
            { id: "2", label: "label-2" },
          ]}
        />,
      );
      expect(await screen.findByText("label-1")).toBeInTheDocument();
      expect(await screen.findByText("label-2")).toBeInTheDocument();
    });
  });
});
