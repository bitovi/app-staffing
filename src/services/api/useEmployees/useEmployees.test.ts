import { renderHook, act } from "@testing-library/react-hooks";

import useEmployees from "./useEmployees";
import { employees } from "../employees/fixtures";
import { skillList } from "../shared";
import { employeeStoreManager } from "../employees/mocks";

const [react] = skillList;

describe("useEmployees", () => {
  beforeEach(async () => {
    await employeeStoreManager.loadResources();
  });

  afterEach(async () => {
    await employeeStoreManager.clearResources();
  });

  it("works", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEmployees());
    expect(result.current.employees).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.employees).toEqual(employees);
  });

  it("adds an employee", async () => {
    const { result } = renderHook(() => useEmployees());

    const employee = {
      name: "test",
      startDate: "01/01/2021",
      endDate: "01/01/2022",
      skills: [{ name: react }],
    };

    let id = "";
    await act(async () => {
      id = await result.current.addEmployee(employee);
    });

    const newEmployee = { ...employee, id };

    expect(
      result.current.employees?.find(({ id }) => id === newEmployee.id),
    ).toEqual(newEmployee);
  });

  it("update an employee", async () => {
    const { result } = renderHook(() => useEmployees());

    const employee = {
      ...employees[0],
      name: "FAKE NAME",
    };

    await act(() => result.current.updateEmployee(employee.id, employee));

    expect(
      result.current.employees?.find(({ id }) => id === employee.id),
    ).toEqual(employee);
  });
});
