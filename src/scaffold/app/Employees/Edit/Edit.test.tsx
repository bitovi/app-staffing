import { render, screen } from "@testing-library/react";

import Edit from "./Edit";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "fake-id" }),
  useHistory: () => jest.fn(),
}));

jest.mock("../../../services/api/api", () => ({
  ...jest.requireActual("../../../services/api/api"),
  getOne: () => {
    return Promise.resolve({
      name: "Bartholome Blanda",
      start_date: null,
      end_date: null,
      id: "6630618b-e3e8-4ce0-bd69-1a4c1c811b52",
      skills: [],
    });
  },
}));

describe("scaffold/app/Employees/Edit", () => {
  it("renders form", async () => {
    render(<Edit />);
    const pageHeader = await screen.findByText(/employee/i);
    const nameLabel = await screen.findAllByText("Name");
    const startDateLabel = await screen.findAllByText("Start Date");
    const endDateLabel = await screen.findAllByText("End Date");
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader?.tagName).toBe("H1");
    expect(nameLabel[0]).toBeInTheDocument();
    expect(startDateLabel[0]).toBeInTheDocument();
    expect(endDateLabel[0]).toBeInTheDocument();
  });
});
