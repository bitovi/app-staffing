import { expect } from "chai";

import { getData } from "./api";

describe("Services/API", () => {
  describe("getData", () => {
    it("works", async () => {
      expect(await getData()).to.deep.equal([
        { id: 1, name: "bar" },
        { id: 2, name: "bam" },
        { id: 3, name: "baz" },
      ]);
    });
  });
});
