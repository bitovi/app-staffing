import type { Employee } from "..";

import { act } from "@testing-library/react-hooks";

import useRest from "./useRest";
import { employees } from "../employees/fixtures";
import { skillList } from "../shared";
import { employeeStoreManager } from "../employees/mocks";
import { renderHook } from "../../../testUtils";

const [react] = skillList;

describe("useRest", () => {
  beforeEach(async () => {
    await employeeStoreManager.loadResources();
  });

  afterEach(async () => {
    await employeeStoreManager.clearResources();
  });

  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRest<Employee>("/api/v1/employees"),
    );
    expect(result.current.data).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(employees);
  });

  it("adds", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRest<Employee>("/api/v1/employees"),
    );

    const employee = {
      name: "test",
      startDate: "01/01/2021",
      endDate: "01/01/2022",
      skills: [{ name: react }],
    };

    await waitForNextUpdate();

    let id = "";
    await act(async () => {
      id = await result.current.useAdd(employee);
    });

    const newEmployee = { ...employee, id };

    expect(
      result.current.data?.find(({ id }) => id === newEmployee.id),
    ).toEqual(newEmployee);
  });

  it("updates", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRest<Employee>("/api/v1/employees"),
    );

    await waitForNextUpdate();

    const employee = {
      ...employees[0],
      name: "FAKE NAME",
    };

    await act(() => result.current.useUpdate(employee.id, employee));

    expect(result.current.data?.find(({ id }) => id === employee.id)).toEqual(
      employee,
    );
  });

  it("deletes", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRest<Employee>("/api/v1/employees"),
    );

    await waitForNextUpdate();

    await act(() => result.current.useDelete(employees[0].id));

    expect(result.current.data?.find(({ id }) => id === employees[0].id)).toBe(
      undefined,
    );
  });

  it("paginates", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRest<Employee>("/api/v1/employees", {
        count: 1,
        page: 2,
      }),
    );

    await waitForNextUpdate();

    expect(result.current.data?.length).toBe(1);
    expect(result.current.data).toEqual([employees[1]]);
  });

  it("filters", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRest<Employee>("/api/v1/employees", {
        filter: { name: employees[1].name },
      }),
    );

    await waitForNextUpdate();

    expect(result.current.data?.length).toBe(1);
    expect(result.current.data).toEqual([employees[1]]);
  });

  it("sorts", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRest<Employee>("/api/v1/employees", {
        sort: "name",
      }),
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(
      employees.sort((a, b) => (a.name < b.name ? -1 : 1)),
    );
  });

  it("filters, sorts, and paginates", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRest<Employee>("/api/v1/employees", {
        filter: { id: { $lte: "3" } },
        page: 1,
        count: 2,
        sort: "name",
      }),
    );

    await waitForNextUpdate();
    expect(result.current.data?.length).toBe(2);

    result.current.data?.forEach(({ id }) => {
      expect(id < "3").toBeTruthy();
    });

    const firstEmployeeName = result.current.data?.[0].name;
    const secondEmployeeName = result.current.data?.[1].name;

    if (!firstEmployeeName || !secondEmployeeName) {
      fail("employee names should have values");
    }

    expect(firstEmployeeName < secondEmployeeName).toBeTruthy();
  });
});
