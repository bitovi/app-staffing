import {
  render,
  screen,
  within,
  waitFor,
  act,
  prettyDOM,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Employees from "./Employees";

jest.mock("../../services/api/api", () => ({
  getData: () =>
    Promise.resolve([
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
    ]),
}));

describe("scaffold/app/Employees", () => {
  it("Renders h1 tag for page title", async () => {
    await act(async () => {
      render(<Employees />);
    });

    await waitFor(() => {
      const pageTitle = screen.getByText("Employee");
      expect(pageTitle).toBeInTheDocument();
      expect(pageTitle?.tagName).toBe("H1");
    });
  });

  it("renders row", async () => {
    await act(async () => {
      render(<Employees />);
    });

    await waitFor(() => {
      const firstRowName = screen.getByText("Bartholome Blanda");
      expect(firstRowName).toBeInTheDocument();
    });
  });

  // @todo edit/delete, for some reason extra columns not rendering in test?

  it("resets modal form fields when closed", async () => {
    render(<Employees />);

    const addButton = screen.getByText(/add team member/i);

    userEvent.click(addButton);

    const modal = await screen.findByRole("dialog");
    const cancelButton = within(modal).getByText(/Cancel/i);

    const modalNameInput = await screen.findByPlaceholderText(/^name$/i);
    userEvent.type(modalNameInput, "Johnny Appleseed");
    expect(modalNameInput).toHaveValue("Johnny Appleseed");

    userEvent.click(cancelButton);

    await waitFor(() => expect(modal).not.toBeInTheDocument());

    userEvent.click(addButton);

    const modalNameInput2 = await screen.findByPlaceholderText(/^name$/i);
    expect(modalNameInput2).toHaveValue("");
  });
});
