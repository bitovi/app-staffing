import { fireEvent, render } from "@testing-library/react";
import { orderBy } from "lodash";
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

  describe("Skills Sorting", () => {
    const useSkillsMocked = () => {
      return skills;
    };

    it("renders skills sorted descending and descending icon rendered on first load", async () => {
      const { getByTestId, getAllByTestId } = render(
        <Skills useSkills={useSkillsMocked} />,
      );
      const sortingButton = getByTestId("sort-icon-desc");
      expect(sortingButton).toBeInTheDocument();

      const renderedSkills = getAllByTestId("skill-name").map(
        (item) => item.textContent,
      );
      const expectedSkills = orderBy(
        skills.map((skill) => skill.name),
        [],
        ["desc"],
      );
      expect(renderedSkills).toEqual(expectedSkills);
    });

    it("Changes sorting order and icon direction when clicking on icon", async () => {
      const { getByTestId, getAllByTestId } = render(
        <Skills useSkills={useSkillsMocked} />,
      );
      const sortingButton = getByTestId("sort-icon-desc");
      fireEvent.click(sortingButton);
      expect(sortingButton).not.toBeInTheDocument();
      const ascSortingButton = getByTestId("sort-icon-asc");
      expect(ascSortingButton).toBeInTheDocument();

      const renderedSkills = getAllByTestId("skill-name").map(
        (item) => item.textContent,
      );
      const expectedSkills = orderBy(
        skills.map((skill) => skill.name),
        [],
        ["asc"],
      );
      expect(renderedSkills).toEqual(expectedSkills);
    });

    it("hides sorting icon after clicking twice and unsorts the list", () => {
      const { getByTestId, getAllByTestId } = render(
        <Skills useSkills={useSkillsMocked} />,
      );
      const sortingButton = getByTestId("sort-icon-desc");
      fireEvent.click(sortingButton);
      const ascSortingButton = getByTestId("sort-icon-asc");
      fireEvent.click(ascSortingButton);

      expect(sortingButton).not.toBeInTheDocument();
      expect(ascSortingButton).not.toBeInTheDocument();

      const renderedSkills = getAllByTestId("skill-name").map(
        (item) => item.textContent,
      );
      const expectedSkills = skills.map((skill) => skill.name);
      expect(renderedSkills).toEqual(expectedSkills);
    });
  });
});
