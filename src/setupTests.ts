/* eslint-disable import/no-extraneous-dependencies */

import chai from "chai";
import chaiDom from "chai-dom";

chai.use(chaiDom);

import "@testing-library/jest-dom";

import { setupServer } from "msw/node";
import mocks from "./services/mocks";
import { cache } from "swr";
const server = setupServer(...mocks);
beforeAll(() => server.listen());
afterEach(() => {
  cache.clear();
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
