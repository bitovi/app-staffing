import type { Employee } from "..";

import { renderHook, act } from "@testing-library/react-hooks";

import useRest from "./useRest";
import { employees } from "../employees/fixtures";
import { skillList } from "../shared";

const [react] = skillList;

describe("useRest", () => {
  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRest<Employee>("/api/v1/employees"),
    );
    expect(result.current.data).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(employees);
  });

  it("adds", async () => {
    const { result } = renderHook(() => useRest<Employee>("/api/v1/employees"));

    const employee = {
      name: "test",
      startDate: "01/01/2021",
      endDate: "01/01/2022",
      skills: [{ name: react }],
    };

    await act(async () => {
      await result.current.useAdd(employee);
    });

    const id = employees.find(({ name }) => name === employee.name)?.id;
    const newEmployee = { ...employee, id };

    expect(result.current.data).toEqual(employees);
    expect(employees.find(({ id }) => id === newEmployee.id)).toEqual(
      newEmployee,
    );
  });

  it("updates", async () => {
    const { result } = renderHook(() => useRest<Employee>("/api/v1/employees"));

    expect(result.current.data).toEqual(employees);

    const employee = {
      ...employees[0],
      name: "FAKE NAME",
    };

    await act(() => result.current.useUpdate(employee.id, employee));

    expect(result.current.data).toEqual(employees);
    expect(employees.find(({ id }) => id === employee.id)).toEqual(employee);
  });
});
