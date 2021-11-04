import type { Employee } from "..";

import { act, renderHook } from "@testing-library/react-hooks";
import { SWRConfig } from "swr";

import useRest from "./useRestV2";
import { employeeStoreManager } from "../employees/mocks";
import { employees } from "../employees/fixtures";
import { Suspense } from "react";

export const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  </Suspense>
);

describe("useRest", () => {
  beforeEach(async () => {
    await employeeStoreManager.load();
  });

  afterEach(async () => {
    await employeeStoreManager.clear();
  });

  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useRest<Employee>("/api/v1/employees", undefined),
      { wrapper },
    );

    await waitForNextUpdate();
    const results = employees.map((x) => {
      x.startDate = new Date(x.startDate);
      return x;
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(results);
  });

  it("adds", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useRest<Employee>("/api/v1/employees", undefined),
      { wrapper },
    );

    await waitForNextUpdate();

    const employee = {
      name: "test",
      startDate: new Date(2021, 0, 1),
      endDate: new Date(2022, 0, 1),
      skills: [{ name: "React" as const }],
    };

    let id = "";
    await act(async () => {
      id = await result.current.handleAdd(employee);
    });

    const newEmployee = { ...employee, id };

    expect(
      result.current.data?.find(({ id }) => id === newEmployee.id),
    ).toEqual(newEmployee);
  });

  it("updates", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useRest<Employee>("/api/v1/employees", undefined),
      { wrapper },
    );

    await waitForNextUpdate();

    const employee = {
      ...employees[0],
      name: "FAKE NAME",
    };

    await act(() => result.current.handleUpdate(employee.id, employee));

    expect(result.current.data?.find(({ id }) => id === employee.id)).toEqual(
      employee,
    );
  });

  it("deletes", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useRest<Employee>("/api/v1/employees", undefined),
      { wrapper },
    );

    await waitForNextUpdate();

    await act(() => result.current.handleDelete(employees[0].id));

    expect(result.current.data?.find(({ id }) => id === employees[0].id)).toBe(
      undefined,
    );
  });

  it("paginates", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useRest<Employee>("/api/v1/employees", {
          count: 1,
          page: 2,
        }),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data?.length).toBe(1);
    expect(result.current.data).toEqual([employees[1]]);
  });

  it("filters", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useRest<Employee>("/api/v1/employees", {
          filter: { name: employees[1].name },
        }),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data?.length).toBe(1);
    expect(result.current.data).toEqual([employees[1]]);
  });

  it("sorts", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useRest<Employee>("/api/v1/employees", {
          sort: "name",
        }),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(
      employees.slice().sort((a, b) => (a.name < b.name ? -1 : 1)),
    );
  });

  it("filters, sorts, and paginates", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useRest<Employee>("/api/v1/employees", {
          filter: { id: { $lte: "3" } },
          page: 1,
          count: 2,
          sort: "name",
        }),
      { wrapper },
    );

    await waitForNextUpdate();
    expect(result.current.data?.length).toBe(2);

    result.current.data?.forEach(({ id }) => {
      expect(id < "3").toBeTruthy();
    });

    const firstEmployeeName = result.current.data?.[0].name as string;
    const secondEmployeeName = result.current.data?.[1].name as string;
    expect(firstEmployeeName < secondEmployeeName).toBeTruthy();
  });
});
