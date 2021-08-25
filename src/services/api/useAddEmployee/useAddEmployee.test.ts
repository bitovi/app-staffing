import { renderHook } from "@testing-library/react-hooks";

import useAddEmployee from "./useAddEmployee";

describe("useAddEmployee", () => {
  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAddEmployee());
    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBe(undefined);

    const employee = {
      id: (Math.floor(Math.random() * 1000) + 1).toString(), // Temporary, can cause collisions with `key` when mapping over
      avatar:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      name: "test",
      title: "arch wizard",
      startDate: "01/01/2021",
      endDate: "01/01/2022",
      skills: [{ name: "react" }],
      available: true,
    };

    result.current.create(employee);

    await waitForNextUpdate();

    expect(result.current.data).toBe(employee.id);
  });
});
