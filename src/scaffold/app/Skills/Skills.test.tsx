import { render } from "@testing-library/react";
import Skills from "./Skills";

jest.mock("../../services/api/api", () => ({
  getData: () =>
    Promise.resolve([
      {
        id: "37f303e7-5c60-4814-998d-de3a1c191d9c",
        name: "Product Design",
      },
      {
        id: "751fd197-eea6-4ebe-bbee-b71a821db998",
        name: "Angular",
      },
    ]),
}));

describe("scaffold/app/Skills", () => {
  describe("Skills page", () => {
    it("renders table headers", async () => {
      const { findByText } = render(<Skills />);
      const tableHeaderName = await findByText(/Skill name/i);
      const tableHeaderAction = await findByText(/Actions/i);
      expect(tableHeaderName).toBeInTheDocument();
      expect(tableHeaderAction).toBeInTheDocument();
    });

    it("renders Add Skill button", async () => {
      const { findByText } = render(<Skills />);
      const addSkillButton = await findByText("Add Skill");
      expect(addSkillButton).toBeInTheDocument();
    });
  });

  describe("Skills buttons", () => {
    it("renders Add Skill button", async () => {
      const { findByText } = render(<Skills />);
      const addSkillButton = await findByText("Add Skill");
      expect(addSkillButton).toBeInTheDocument();
    });

    it("renders Edit Skill buttons", async () => {
      const { findAllByRole } = render(<Skills />);
      const editIcons = await findAllByRole("button", {
        name: "Edit Skill",
      });
      expect(editIcons[0]).toBeInTheDocument();
    });
  });
});
