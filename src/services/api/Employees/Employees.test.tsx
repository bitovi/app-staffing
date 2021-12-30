import { renderHook } from "@testing-library/react-hooks";
import { expect } from "chai";

import { wrapper } from "../restBuilder/restBuilder.test";
import { loadFixtures, clearFixtures } from "../../../mocks";
import { employees as employeesFixture } from "../../../mocks/employees/fixtures";

import { useEmployees, useEmployee, useEmployeeMutations } from "./Employees";

describe("Services/API/Employees", () => {
  beforeEach(async () => loadFixtures());
  afterEach(async () => clearFixtures());

  describe("useEmployee", () => {
    it("makes the right request", async () => {
      const expected = employeesFixture[2];
      const { result, waitForNextUpdate } = renderHook(
        () => useEmployee(expected.id),
        { wrapper },
      );

      expect(result.current).to.equal(undefined);

      await waitForNextUpdate();

      // TODO: use serializer
      expect(result.current).to.equal({
        id: expected.id,
        ...expected.attributes,
      });
    });
  });

  describe("useEmployees", () => {
    it("makes the right request", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useEmployees(), {
        wrapper,
      });

      expect(result.current).to.equal(undefined);

      await waitForNextUpdate();

      // TODO: use serializer
      expect(result.current).to.equal(
        employeesFixture.map((expected) => ({
          id: expected.id,
          ...expected.attributes,
        })),
      );
    });
  });

  describe("useEmployeeMutations", () => {
    it("provides the mutations", async () => {
      const { result } = renderHook(() => useEmployeeMutations(), {
        wrapper,
      });

      expect(result.current)
        .to.have.property("createEmployee")
        .that.is.a("function");
      expect(result.current)
        .to.have.property("updateEmployee")
        .that.is.a("function");
      expect(result.current)
        .to.have.property("destroyEmployee")
        .that.is.a("function");
    });
  });
});
