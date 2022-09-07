import { render } from "@testing-library/react";
import { skills } from "../../mocks/fixtures";
import Skills from "./Skills";

describe("Pages/Skills", () => {
  describe("Skills fallback when loading", () => {
    // Simulate forever loading request to trigger Suspense
    const useSkillsMocked = () => {
      throw new Promise(() => undefined);
    };

    it("renders table headers", async () => {
      const { findByText } = render(<Skills useSkills={useSkillsMocked} />);
      const tableHeaderName = await findByText(/Skill name/i);
      const tableHeaderAction = await findByText(/Actions/i);
      expect(tableHeaderName).toBeInTheDocument();
      expect(tableHeaderAction).toBeInTheDocument();
    });

    it("renders Add Skill button", async () => {
      const { findByText } = render(<Skills useSkills={useSkillsMocked} />);
      const addSkillButton = await findByText("Add Skill");
      expect(addSkillButton).toBeInTheDocument();
    });

    it("renders skeleton rows", async () => {
      const { getAllByTestId } = render(<Skills useSkills={useSkillsMocked} />);
      const skeletonRows = await getAllByTestId("skeleton-row");
      expect(skeletonRows[0]).toBeInTheDocument();
    });

    // Should test that clicking the button triggers the action when action is implemented
  });

  describe("Skills with data", () => {
    const useSkillsMocked = () => {
      return skills;
    };

    it("renders Add Skill button", async () => {
      const { findByText } = render(<Skills useSkills={useSkillsMocked} />);
      const addSkillButton = await findByText("Add Skill");
      expect(addSkillButton).toBeInTheDocument();
    });

    it("renders Edit Skill buttons", async () => {
      const { findAllByRole } = render(<Skills useSkills={useSkillsMocked} />);
      const editIcons = await findAllByRole("button", {
        name: "Edit Skill",
      });
      expect(editIcons[0]).toBeInTheDocument();
    });
  });
});
