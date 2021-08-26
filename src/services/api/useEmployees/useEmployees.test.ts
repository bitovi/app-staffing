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

  it("update an employee", async () => {
    const { result } = renderHook(() => useEmployees());

    const employee = {
      id: "1",
      avatar:
        "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Tom2",
      title: "Software Developer",
      startDate: "08/19/2021",
      endDate: "12/12/2021",
      skills: [
        { name: "React" },
        { name: "Project Management" },
        { name: "Angular" },
      ],
      available: false,
    };

    await act(() => result.current.updateEmployee(employee));

    expect(result.current.data).toEqual(employees);
    expect(employees.find(({ id }) => id === employee.id)).toEqual(employee);
  });
});
