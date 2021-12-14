import { SWRConfig } from "swr";
import React, { Suspense } from "react";
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
      expect(employees).toEqual(employeesFixture);
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
});
