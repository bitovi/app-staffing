import { renderHook, act } from "@testing-library/react-hooks";

import useEmployees from "./useEmployees";
import { employees } from "../fixtures";

describe("useEmployees", () => {
  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEmployees());
    expect(result.current.data).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(employees);
  });

  it("adds an employee", async () => {
    const { result } = renderHook(() => useEmployees());

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

    await act(() => result.current.addEmployee(employee));

    expect(result.current.data).toEqual(employees);
    expect(employees.find(({ id }) => id === employee.id)).toEqual(employee);
  });
});
