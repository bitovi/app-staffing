import { renderHook } from "@testing-library/react-hooks";

import useProjects from "./useProjects";

import { projectStoreManager } from "../projects/mocks";
import { projects } from "../projects/fixtures";
import { wrapper } from "../restBuilder/useRest.test";

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
