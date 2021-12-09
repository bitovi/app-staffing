import { renderHook } from "@testing-library/react-hooks";

import { useProjection } from "./useProjection";

describe("useProjection", () => {
  it("creates projections", () => {
    const { result } = renderHook(() => useProjection());

    expect(result.current.timeline.length).toBe(
      result.current.projections[0].roleProjection.length,
    );
  });
});
