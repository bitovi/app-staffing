import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DeleteProjectModal from "./DeleteProjectModal";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockDeleteProject = jest.fn();
const mockReset = jest.fn();
jest.mock("../../../../services/api", () => ({
  useProjects: () => ({
    deleteProject: mockDeleteProject,
    reset: mockReset,
  }),
}));

describe("Pages/Projects/Components/DeleteProjectModal", () => {
  it("renders", async () => {
    const projectName = "some project";
    render(
      <DeleteProjectModal
        projectId="1"
        projectName={projectName}
        isOpen={true}
        onClose={() => undefined}
      />,
    );
    expect(screen.getByText(/some project/g)).toBeInTheDocument();
    expect(screen.getByText(/Yes, Remove & Delete/g)).toBeInTheDocument();
  });

  it("navigate to projects list on success", async () => {
    render(
      <DeleteProjectModal
        projectId="1"
        projectName="someproject"
        isOpen={true}
        onClose={() => undefined}
      />,
    );

    fireEvent.click(screen.getByText(/Yes, Remove & Delete/g));
    await waitFor(() => expect(mockHistoryPush).toBeCalledWith(`/`));
  });

  it("reset modal on close", async () => {
    render(
      <DeleteProjectModal
        projectId="1"
        projectName="someproject"
        isOpen={true}
        onClose={() => undefined}
      />,
    );

    fireEvent.click(screen.getByText(/No, Return to Page/g));
    expect(mockReset).toBeCalled();
  });
});
