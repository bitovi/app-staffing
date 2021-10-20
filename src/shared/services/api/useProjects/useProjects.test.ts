import { renderHook } from "@testing-library/react-hooks";

import useProjects from "./useProjects";

import { projectStoreManager } from "../projects/mocks";
import { projects } from "../projects/fixtures";
import { wrapper } from "../useRest/useRest.test";

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

    expect(result.current.isLoading).toBe(true);
    expect(result.current.projects).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.projects).toEqual(projects);
  });
});
