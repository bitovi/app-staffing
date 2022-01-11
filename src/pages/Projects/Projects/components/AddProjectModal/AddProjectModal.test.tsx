import { render, screen, waitFor, cleanup } from "@testing-library/react";
import AddProjectModal from "./AddProjectModal";
import userEvent from "@testing-library/user-event";
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockAddProject = jest.fn();

describe("Pages/Projects/Components/AddProjectModal", () => {
  afterEach(cleanup);

  it("renders", async () => {
    render(
      <AddProjectModal
        addProject={async () => ""}
        isOpen={true}
        onClose={() => undefined}
      />,
    );

    expect(screen.getByText(/Save/g)).toBeInTheDocument();
  });

  it("enter project name and description, then navigates to project details on success", async () => {
    const someId = "1234";
    mockAddProject.mockReturnValueOnce(
      new Promise((resolve) => resolve(someId)),
    );

    const { getByTestId, getByRole, getByText } = render(
      <AddProjectModal
        addProject={mockAddProject}
        isOpen={true}
        onClose={() => undefined}
      />,
    );

    const projectName = getByTestId("projectInput") as HTMLInputElement;
    const projectDescription = getByTestId("projectDescription");

    const saveButton = getByRole("button", { name: "Save & Close" });
    expect(saveButton).toHaveAttribute("aria-disabled", "true");

    userEvent.type(projectName, "Adidas");
    userEvent.type(projectDescription, "Fashion and athletics");

    expect(saveButton).toBeEnabled();

    userEvent.click(saveButton);

    // Save button will be in "pending" state when clicked
    await waitFor(() => {
      expect(getByText("Saving")).toBeInTheDocument();
    });

    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalled());

    expect(mockAddProject).toBeCalledWith({
      name: "Adidas",
      description: "Fashion and athletics",
    });
  });
});
