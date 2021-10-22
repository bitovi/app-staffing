import { renderHook } from "@testing-library/react-hooks";

import useEmployees from "./useEmployees";

import { employeeStoreManager } from "../employees/mocks";
import { employees } from "../employees/fixtures";
import { wrapper } from "../useRest/useRest.test";

describe("useEmployees", () => {
  beforeEach(async () => {
    await employeeStoreManager.load();
  });

  afterEach(async () => {
    await employeeStoreManager.clear();
  });

  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEmployees(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.employees).toEqual(employees);
  });
});
