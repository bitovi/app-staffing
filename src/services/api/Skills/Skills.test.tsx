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
      expect(result.current).to.have.property("id", expected.id);
      expect(result.current).to.have.property("name", expected.attributes.name);
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
      for (let i = 0; i < result.current.length; i++) {
        const expected = skillsFixture[i];
        expect(result.current[i]).to.have.property("id", expected.id);
        expect(result.current[i]).to.have.property(
          "name",
          expected.attributes.name,
        );
      }
    });

    it("loads skills with corresponding employees", async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useSkills({ include: "employees" }),
        {
          wrapper,
        },
      );

      expect(result.current).to.equal(undefined);

      await waitForNextUpdate();

      for (let i = 0; i < result.current.length; i++) {
        for (const employee of result.current[i].employees) {
          expect(employee.skills).to.deep.include({
            id: result.current[i].id,
            name: result.current[i].name,
          });
        }
      }
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
