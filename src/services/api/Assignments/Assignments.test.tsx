import { renderHook } from "@testing-library/react-hooks";
import { expect } from "chai";

import { wrapper } from "../restBuilder/restBuilder.test";
import { loadFixtures, clearFixtures, assignments } from "../../../mocks";

import {
  useAssignments,
  useAssignment,
  useAssignmentMutations,
} from "./Assignments";

describe("Services/API/Assignments", () => {
  beforeEach(async () => loadFixtures());
  afterEach(async () => clearFixtures());

  describe("useAssignment", () => {
    it("makes the right request", async () => {
      const expected = assignments[2];
      const { result, waitForNextUpdate } = renderHook(
        () => useAssignment(expected.id),
        { wrapper },
      );

      expect(result.current).to.equal(undefined);

      await waitForNextUpdate();

      // TODO: use serializer
      expect(result.current).to.have.property("id", expected.id);
      expect(result.current).to.have.property("startDate").that.is.a("date");
      expect(result.current).to.have.property("endDate").that.is.a("date");
    });
  });

  describe("useAssignments", () => {
    it("makes the right request", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useAssignments(), {
        wrapper,
      });

      expect(result.current).to.equal(undefined);

      await waitForNextUpdate();

      // TODO: use serializer
      for (let i = 0; i < result.current.length; i++) {
        const expected = assignments[i];

        expect(result.current[i]).to.have.property("id", expected.id);
        expect(result.current[i])
          .to.have.property("startDate")
          .that.is.a("date");
        expect(result.current[i]).to.have.property("endDate").that.is.a("date");
      }
    });
  });

  describe("useAssignmentMutations", () => {
    it("provides the mutations", async () => {
      const { result } = renderHook(() => useAssignmentMutations(), {
        wrapper,
      });

      expect(result.current)
        .to.have.property("createAssignment")
        .that.is.a("function");
      expect(result.current)
        .to.have.property("updateAssignment")
        .that.is.a("function");
      expect(result.current)
        .to.have.property("destroyAssignment")
        .that.is.a("function");
    });
  });
});
