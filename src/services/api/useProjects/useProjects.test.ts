import { renderHook } from "@testing-library/react-hooks";

import useProjects from "./useProjects";

import { projectStoreManager } from "../mocks/projects/mocks";
import { projects } from "../mocks/projects/fixtures";
import { wrapper } from "../restBuilder/legacy/useRest.test";

describe("useProjects", () => {
  beforeEach(async () => {
    await projectStoreManager.load();
  });

  afterEach(async () => {
    await projectStoreManager.clear();
  });

  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProjects(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.projects).toEqual(projects);
  });
});
