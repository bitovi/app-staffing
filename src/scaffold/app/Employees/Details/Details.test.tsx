import { render, screen } from "@testing-library/react";

import Details from "./Details";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "fake-id" }),
}));

jest.mock("../../../services/api/api", () => ({
  getOne: () => {
    return {
      read: () => {
        return {
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
        };
      },
    };
  },
}));

describe("scaffold/app/Employees/Details", () => {
  it("renders page header", async () => {
    render(<Details />);
    const pageHeader = await screen.findByText(/employee/i);
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader?.tagName).toBe("H1");
  });

  it("renders employee data", async () => {
    render(<Details />);
    const label = await screen.findByText("Name");
    const name = await screen.findByText("Bartholome Blanda");
    const skills = await screen.findByText("Project Management");
    expect(label).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(skills).toBeInTheDocument();
  });
});
