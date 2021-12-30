import { renderHook } from "@testing-library/react-hooks";
import { expect } from "chai";

import { wrapper } from "../restBuilder/restBuilder.test";
import { loadFixtures, clearFixtures } from "../../../mocks";
import { skills as skillsFixture } from "../../../mocks/skills/fixtures";

import { useSkills, useSkill, useSkillMutations } from "./Skills";

describe("Services/API/Skills", () => {
  beforeEach(async () => loadFixtures());
  afterEach(async () => clearFixtures());

  describe("useSkill", () => {
    it("makes the right request", async () => {
      const expected = skillsFixture[2];
      const { result, waitForNextUpdate } = renderHook(
        () => useSkill(expected.id),
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

  describe("useSkills", () => {
    it("makes the right request", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useSkills(), {
        wrapper,
      });

      expect(result.current).to.equal(undefined);

      await waitForNextUpdate();

      // TODO: use serializer
      expect(result.current).to.equal(
        skillsFixture.map((expected) => ({
          id: expected.id,
          ...expected.attributes,
        })),
      );
    });
  });

  describe("useSkillMutations", () => {
    it("provides the mutations", async () => {
      const { result } = renderHook(() => useSkillMutations(), {
        wrapper,
      });

      expect(result.current)
        .to.have.property("createSkill")
        .that.is.a("function");
      expect(result.current)
        .to.have.property("updateSkill")
        .that.is.a("function");
      expect(result.current)
        .to.have.property("destroySkill")
        .that.is.a("function");
    });
  });
});
