import { renderHook } from "@testing-library/react-hooks";

import useProjects from "./useProjects";
import { projects } from "../fixtures";

describe("useEmployees", () => {
  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProjects());
    expect(result.current.data).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(projects);
  });
});
