import { expect } from "chai";

import { getData } from "./api";
import { employeeData } from "./mocks";

test("getData Works", async () => {
  expect(await getData()).to.deep.equal(employeeData);
});
