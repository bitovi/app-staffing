/* eslint-disable import/no-extraneous-dependencies */
import "./setupTests.env";

import "@testing-library/jest-dom";
import chai from "chai";
import chaiDom from "chai-dom";
import chaiSpies from "chai-spies";
chai.use(chaiDom);
chai.use(chaiSpies);

import { setupServer } from "msw/node";
import mocks from "./mocks";
import { clearFixtures, loadFixtures } from "./mocks";
import { cleanup } from "@testing-library/react";

const server = setupServer(...mocks);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
beforeEach(async () => {
  await loadFixtures();
});

afterEach(async () => {
  server.resetHandlers();
  await clearFixtures();
  cleanup();
});
