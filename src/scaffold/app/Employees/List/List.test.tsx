import { render } from "@testing-library/react";

import Employees from "./List";

jest.mock("../../../services/api/api", () => ({
  ...jest.requireActual("../../../services/api/api"),
  getMany: () => {
    return Promise.resolve([
      {
        name: "Bartholome Blanda",
        start_date: null,
        end_date: null,
        id: "6630618b-e3e8-4ce0-bd69-1a4c1c811b52",
        skills: [
          {
            name: "React",
            id: "32bbac66-eeb6-4495-b0ab-3f8e3d5af85c",
            label: "React",
          },
          {
            name: "Backend",
            id: "ba241f5c-ccff-48e1-8070-197366afe152",
            label: "Backend",
          },
          {
            name: "Project Management",
            id: "b71f7a24-e7a2-40d7-9be6-6ea4408a5b78",
            label: "Project Management",
          },
        ],
      },
      {
        name: "Brandi Towne",
        start_date: "2023-07-29T00:00:00.000Z",
        end_date: null,
        id: "20a9db29-b009-49b2-9261-dae13ba1813d",
        skills: [
          {
            name: "Angular",
            id: "751fd197-eea6-4ebe-bbee-b71a821db998",
            label: "Angular",
          },
        ],
      },
    ]);
  },
}));

// @todo use msw and test loading/empty states after data layer is implemented

describe("scaffold/app/Employees/List", () => {
  it("renders page header", async () => {
    const { findAllByText } = render(<Employees />);
    const pageHeader = await findAllByText(/employee/i);
    expect(pageHeader[0]).toBeInTheDocument();
    expect(pageHeader[0]?.tagName).toBe("H1");
  });

  it("renders table headers", async () => {
    const { findByText } = render(<Employees />);
    const tableHeaderName = await findByText(/name/i);
    const tableHeaderAction = await findByText(/actions/i);
    expect(tableHeaderName).toBeInTheDocument();
    expect(tableHeaderAction).toBeInTheDocument();
  });

  it("renders Add Team Member button", async () => {
    const { findByText } = render(<Employees />);
    const addSkillButton = await findByText(/add team member/i);
    expect(addSkillButton).toBeInTheDocument();
  });
});
