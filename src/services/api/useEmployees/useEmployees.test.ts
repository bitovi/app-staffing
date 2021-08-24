import { renderHook } from "@testing-library/react-hooks";

import useEmployees from "./useEmployees";
import { employees } from "../fixtures";

describe("useEmployees", () => {
  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEmployees());
    expect(result.current.data).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(employees);
  });
});
