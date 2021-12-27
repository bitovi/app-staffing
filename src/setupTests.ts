/* eslint-disable import/no-extraneous-dependencies */

import "@testing-library/jest-dom";
import chai from "chai";
import chaiDom from "chai-dom";
import chaiSpies from "chai-spies";
chai.use(chaiDom);
chai.use(chaiSpies);

import { setupServer } from "msw/node";
import mocks from "./services/mocks";
const server = setupServer(...mocks);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

window.env = {
  API_BASE_URL: "https://api.dev.bitovi-staffing.com",
};
