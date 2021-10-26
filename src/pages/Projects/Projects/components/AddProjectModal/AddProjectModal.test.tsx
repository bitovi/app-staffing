import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddProjectModal from "./AddProjectModal";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Pages/Projects/Components/AddProjectModal", () => {
  it("renders", async () => {
    render(
      <AddProjectModal
        isOpen={true}
        onClose={() => undefined}
        useProjects={() => {
          return {
            projects: undefined,
            isLoading: false,
            error: undefined,
            addProject: () => new Promise((resolve) => resolve("")),
            updateProject: () => new Promise((resolve) => resolve()),
            deleteProject: () => new Promise((resolve) => resolve()),
            reset: () => undefined,
          };
        }}
      />,
    );

    expect(screen.getByText(/Save/g)).toBeInTheDocument();
  });

  it("navigate to project details on success", async () => {
    const someId = "1234";
    render(
      <AddProjectModal
        isOpen={true}
        onClose={() => undefined}
        useProjects={() => {
          return {
            projects: undefined,
            isLoading: false,
            error: undefined,
            addProject: () => new Promise((resolve) => resolve(someId)),
            updateProject: () => new Promise((resolve) => resolve()),
            deleteProject: () => new Promise((resolve) => resolve()),
            reset: () => undefined,
          };
        }}
      />,
    );

    fireEvent.click(screen.getByText(/Save/g));
    await waitFor(() => expect(mockHistoryPush).toBeCalledWith(`/${someId}`));
  });

  it("reset modal on close", async () => {
    const reset = jest.fn();
    render(
      <AddProjectModal
        isOpen={true}
        onClose={() => undefined}
        useProjects={() => {
          return {
            projects: undefined,
            isLoading: false,
            error: undefined,
            addProject: () => new Promise((resolve) => resolve("")),
            updateProject: () => new Promise((resolve) => resolve()),
            deleteProject: () => new Promise((resolve) => resolve()),
            reset: reset,
          };
        }}
      />,
    );

    fireEvent.click(screen.getByText(/Cancel/g));
    expect(reset).toBeCalled();
  });
});
