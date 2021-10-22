import { renderHook } from "@testing-library/react-hooks";

import useSkills from "./useSkills";

import { skillStoreManager } from "../skills/mocks";
import { skillList } from "../skills/fixtures";
import { wrapper } from "../useRest/useRest.test";

describe("useSkills", () => {
  beforeEach(async () => {
    await skillStoreManager.loadResources();
  });

  afterEach(async () => {
    await skillStoreManager.clearResources();
  });

  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSkills(), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.skills).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.skills).toEqual(skillList);
  });
});
