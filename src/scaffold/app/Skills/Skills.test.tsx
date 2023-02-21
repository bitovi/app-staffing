import { screen, render } from "@testing-library/react";
import Skills from "./Skills";

jest.mock("../../services/api/api", () => ({
  fetchData: () => {
    return {
      read: () => {
        return [
          {
            id: "37f303e7-5c60-4814-998d-de3a1c191d9c",
            name: "Product Design",
          },
          {
            id: "751fd197-eea6-4ebe-bbee-b71a821db998",
            name: "Angular",
          },
        ];
      },
    };
  },
}));

// @todo use msw and test loading/empty states after data layer is implemented

describe("scaffold/app/Skills", () => {
  it("renders page header", async () => {
    const { findAllByText } = render(<Skills />);
    const pageHeader = await findAllByText(/skill/i);
    expect(pageHeader[0]).toBeInTheDocument();
    expect(pageHeader[0]?.tagName).toBe("H1");
  });

  it("renders table headers", async () => {
    const { findByText } = render(<Skills />);
    const tableHeaderName = await findByText(/skill name/i);
    const tableHeaderAction = await findByText(/actions/i);
    expect(tableHeaderName).toBeInTheDocument();
    expect(tableHeaderAction).toBeInTheDocument();
  });

  it("renders Add Skill button", async () => {
    const { findByText } = render(<Skills />);
    const addSkillButton = await findByText(/add skill/i);
    expect(addSkillButton).toBeInTheDocument();
  });

  it("renders first row", async () => {
    render(<Skills />);

    const firstRowName = screen.getByText("Product Design");
    expect(firstRowName).toBeInTheDocument();
  });
});
