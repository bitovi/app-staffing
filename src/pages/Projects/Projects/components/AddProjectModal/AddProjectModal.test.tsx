import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddProjectModal from "./AddProjectModal";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockAddProject = jest.fn();

describe("Pages/Projects/Components/AddProjectModal", () => {
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

    const { getByTestId } = render(
      <AddProjectModal
        addProject={mockAddProject}
        isOpen={true}
        onClose={() => undefined}
      />,
    );

    const projectName = getByTestId("projectInput") as HTMLInputElement;
    const projectDescription = getByTestId("projectDescription");

    fireEvent.change(projectName, { target: { value: "Adidas" } });
    fireEvent.change(projectDescription, {
      target: { value: "Fashion and athletics" },
    });

    fireEvent.click(screen.getByText(/Save/g));

    await waitFor(() =>
      expect(mockHistoryPush).toBeCalledWith(`/projects/${someId}`),
    );

    expect(mockAddProject).toBeCalledWith({
      name: "Adidas",
      description: "Fashion and athletics",
    });
  });
});
