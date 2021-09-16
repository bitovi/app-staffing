import { renderHook, act } from "@testing-library/react-hooks";

import useProjects from "./useProjects";
import { projects } from "../projects/fixtures";
import { NewProject } from "../projects";
import { projectStoreManager } from "../projects/mocks";

describe("useProjects", () => {
  beforeAll(async () => {
    await projectStoreManager.loadProjects();
  });

  afterAll(async () => {
    await projectStoreManager.clearProjects();
  });

  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProjects());
    expect(result.current.projects).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.projects).toEqual(projects);
  });

  it("adds a project", async () => {
    const { result } = renderHook(() => useProjects());

    const newProject: NewProject = {
      name: "New Test Project",
      description: "description",
      roles: [],
    };

    let id = "";
    await act(async () => {
      id = await result.current.addProject(newProject);
    });

    const newProjectWithId = { ...newProject, id };

    expect(
      result.current.projects?.find(({ id }) => id === newProjectWithId.id),
    ).toEqual(newProjectWithId);
  });

  it("updates a project", async () => {
    const { result } = renderHook(() => useProjects());

    const editedProject = {
      ...projects[0],
      id: projects[0].id,
      name: "Edited Project",
      roles: [],
    };

    await act(() =>
      result.current.updateProject(editedProject.id, editedProject),
    );

    expect(
      result.current.projects?.find(({ id }) => id === editedProject.id),
    ).toEqual(editedProject);
  });
});
