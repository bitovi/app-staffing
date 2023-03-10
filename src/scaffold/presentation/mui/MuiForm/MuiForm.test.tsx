import { render, screen } from "@testing-library/react";
import MuiForm from ".";

describe("scaffold/presentation/mui/MuiForm", () => {
  describe("MuiForm", () => {
    it("works", async () => {
      render(
        <MuiForm
          isEdit={false}
          onUpdateField={jest.fn()}
          onSave={jest.fn()}
          formState={{ name: "" }}
          fields={[
            {
              key: "name",
              label: "Name",
              attributeSchema: { type: "string", allowNull: false },
              render: () => (
                <label>
                  Name:
                  <input type="text" />
                </label>
              ),
            },
          ]}
        />,
      );
      expect(await screen.findByText("Name:")).toBeInTheDocument();
    });
  });
});
