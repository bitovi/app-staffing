import { renderHook } from "@testing-library/react-hooks";

import useRoles from "./useRoles";

import { rolesStoreManager } from "../roles/mocks";
import { roles } from "../roles/fixtures";
import { wrapper } from "../useRest/useRest.test";

describe("useRoles", () => {
  beforeEach(async () => {
    await rolesStoreManager.loadResources();
  });

  afterEach(async () => {
    await rolesStoreManager.clearResources();
  });

  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRoles(), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.roles).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.roles).toEqual(roles);
  });
});
