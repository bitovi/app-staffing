import { expect } from "chai";

import { getData } from "./api";
import { employeeData } from "./mocks";

describe("Services/API", () => {
  describe("getData", () => {
    it("works", async () => {
      expect(await getData()).to.deep.equal(employeeData);
    });
  });
});
