import noop from "lodash/noop";
import { SWRConfig } from "swr";
import React, { Suspense } from "react";
import { waitFor, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import useEmployees from "./useEmployees";
import { skillStoreManager } from "../skills/mocks";
import { Employee } from "../employees/interfaces";
import { employeeStoreManager } from "../employees/mocks";
import { employeeSkillsStoreManager } from "../employee_skills/mocks";
import { employees as employeesFixture } from "../employees/fixtures";
import { employeesSkills as employeesSkillsFixture } from "../employee_skills/fixtures";

describe("useEmployees", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<div>Loading...</div>}>
      <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
    </Suspense>
  );

  beforeEach(async () => {
    await employeeSkillsStoreManager.load();
    await skillStoreManager.load();
    await employeeStoreManager.load();
  });

  afterEach(async () => {
    await employeeSkillsStoreManager.clear();
    await skillStoreManager.clear();
    await employeeStoreManager.clear();
  });

  describe("useEmployeeList", () => {
    it("should load list of employees sorted by last name", async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => {
          const { useEmployeeList } = useEmployees();
          return useEmployeeList();
        },
        {
          wrapper,
        },
      );
      await waitForNextUpdate();

      const { error, data: employees } = result.current;
      expect(error).toBeUndefined();
      expect(employees).toBeDefined();
      expect(employees).toEqual(
        employeesFixture.map((employee) => ({
          id: employee.id,
          name: employee.name,
          startDate: employee.start_date,
          endDate: employee.end_date,
        })),
      );
    });

    it("should load employee's skills if 'include' param is provided", async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => {
          const { useEmployeeList } = useEmployees();
          return useEmployeeList({ include: "skills" });
        },
        {
          wrapper,
        },
      );
      await waitForNextUpdate();

      const { error, data: employees } = result.current;
      expect(error).toBeUndefined();
      expect(employees).toHaveLength(employeesFixture.length);

      (employees as Employee[]).forEach((employee) => {
        const actualSkillsIds = employee.skills.map((e) => e.id);

        const expectedSkillsIds = employeesSkillsFixture
          .filter((employeeSkill) => employeeSkill.employee_id === employee.id)
          .map((employeeSkill) => employeeSkill.skill_id);

        expect(actualSkillsIds).toStrictEqual(expectedSkillsIds);
      });
    });
  });

  describe("useEmployeeActions", () => {
    it("Adds employee and hydrates skills fields", async () => {
      const { result: actions } = renderHook(() => useEmployees());

      const newEmployee: Omit<Employee, "id"> = {
        name: "Test Person",
        startDate: new Date(),
        endDate: undefined,
        skills: [
          {
            name: "Angular",
            id: "100",
          },
          {
            name: "Design",
            id: "101",
          },
        ],
      };

      const { result: dataList, waitForNextUpdate } = renderHook(() =>
        actions.current.useEmployeeList(),
      );

      await waitForNextUpdate();

      const { addEmployee } = actions.current.useEmployeeActions();
      await act(() => addEmployee(newEmployee).then(noop));

      await waitFor(() =>
        expect(
          dataList.current?.data
            ?.filter((employee) => employee.name === "Test Person")
            .map((employee) => employee.skills)[0],
        ).toEqual([
          { id: "100", name: "Angular" },
          { id: "101", name: "Design" },
        ]),
      );
    });
  });
});
