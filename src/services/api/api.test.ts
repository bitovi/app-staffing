import { expect } from "chai";

import { getData } from "./api";
import { employees } from "./fixtures";

test("getData Works", async () => {
  expect(await getData()).to.deep.equal(employees);
});
