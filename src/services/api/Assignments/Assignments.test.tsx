import { renderHook } from "@testing-library/react-hooks";
import { expect } from "chai";

import { wrapper } from "../restBuilder/restBuilder.test";
import { loadFixtures, clearFixtures } from "../../../mocks/fixtures";
import { assignments as assignmentsFixture } from "../../../mocks/assignments/fixtures";

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
      const expected = assignmentsFixture[2];
      const { result, waitForNextUpdate } = renderHook(
        () => useAssignment(expected.id),
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

  describe("useAssignments", () => {
    it("makes the right request", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useAssignments(), {
        wrapper,
      });

      expect(result.current).to.equal(undefined);

      await waitForNextUpdate();

      // TODO: use serializer
      expect(result.current).to.equal(
        assignmentsFixture.map((expected) => ({
          id: expected.id,
          ...expected.attributes,
        })),
      );
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
