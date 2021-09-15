import { renderHook, act } from "@testing-library/react-hooks";

import useProjects from "./useProjects";
import { projects } from "../projects/fixtures";
import { NewProject } from "../projects";

describe("useProjects", () => {
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

    await act(async () => {
      await result.current.addProject(newProject);
    });

    const id = projects.find(({ name }) => name === newProject.name)?.id;
    const newProjectWithId = { ...newProject, id };

    expect(result.current.projects).toEqual(projects);
    expect(projects.find(({ id }) => id === newProjectWithId.id)).toEqual(
      newProjectWithId,
    );
  });

  it("updates a project", async () => {
    const { result } = renderHook(() => useProjects());

    const editedProject = {
      ...projects[0],
      id: projects[0].id,
      name: "Edited Project",
      roles: [],
    };

    await act(() => result.current.updateProject(editedProject));

    expect(result.current.projects).toEqual(projects);
    expect(projects.find(({ id }) => id === editedProject.id)).toEqual(
      editedProject,
    );
  });
});
