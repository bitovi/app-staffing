import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddProjectModal from "./AddProjectModal";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockAddProject = jest.fn();
const mockReset = jest.fn();
jest.mock("../../../../../services/api", () => ({
  useProjects: () => ({
    addProject: mockAddProject,
    reset: mockReset,
  }),
}));

describe("Pages/Projects/Components/AddProjectModal", () => {
  it("renders", async () => {
    render(<AddProjectModal isOpen={true} onClose={() => undefined} />);

    expect(screen.getByText(/Save/g)).toBeInTheDocument();
  });

  it("enter project name and description, then navigates to project details on success", async () => {
    const someId = "1234";
    mockAddProject.mockReturnValueOnce(
      new Promise((resolve) => resolve(someId)),
    );

    const { getByText, getByTestId } = render(
      <AddProjectModal isOpen={true} onClose={() => undefined} />,
    );

    const projectName = getByTestId("projectInput") as HTMLInputElement;
    const projectDescription = getByTestId("projectDescription");

    expect(projectName).toBeInTheDocument();
    expect(projectDescription).toBeInTheDocument();

    fireEvent.change(projectName, { target: { value: "Adidas" } });
    fireEvent.change(projectDescription, {
      target: { value: "Fashion and athletics" },
    });

    expect(projectName.value).toBe("Adidas");
    expect(getByText(/Fashion and athletics/g)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Save/g));

    await waitFor(() =>
      expect(mockHistoryPush).toBeCalledWith(`/projects/${someId}`),
    );
  });

  it("reset modal on close", async () => {
    render(<AddProjectModal isOpen={true} onClose={() => undefined} />);

    fireEvent.click(screen.getByText(/Cancel/g));
    expect(mockReset).toBeCalled();
  });
});
