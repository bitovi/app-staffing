import { renderHook } from "@testing-library/react-hooks";
import { expect } from "chai";

import { wrapper } from "../restBuilder/restBuilder.test";
import { loadFixtures, clearFixtures } from "../../../mocks/fixtures";
import { projects as projectsFixture } from "../../../mocks/projects/fixtures";

import { useProjects, useProject, useProjectMutations } from "./Projects";

describe("Services/API/Projects", () => {
  beforeEach(async () => loadFixtures());
  afterEach(async () => clearFixtures());

  describe("useProject", () => {
    it("makes the right request", async () => {
      const expected = projectsFixture[2];
      const { result, waitForNextUpdate } = renderHook(
        () => useProject(expected.id),
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

  describe("useProjects", () => {
    it("makes the right request", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useProjects(), {
        wrapper,
      });

      expect(result.current).to.equal(undefined);

      await waitForNextUpdate();

      // TODO: use serializer
      expect(result.current).to.equal(
        projectsFixture.map((expected) => ({
          id: expected.id,
          ...expected.attributes,
        })),
      );
    });
  });

  describe("useProjectMutations", () => {
    it("provides the mutations", async () => {
      const { result } = renderHook(() => useProjectMutations(), {
        wrapper,
      });

      expect(result.current)
        .to.have.property("createProject")
        .that.is.a("function");
      expect(result.current)
        .to.have.property("updateProject")
        .that.is.a("function");
      expect(result.current)
        .to.have.property("destroyProject")
        .that.is.a("function");
    });
  });
});
