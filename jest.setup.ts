/* eslint-disable import/no-extraneous-dependencies */

import "unfetch/polyfill";

import "@testing-library/jest-dom";
import chai from "chai";
import chaiDom from "chai-dom";
import chaiSpies from "chai-spies";
chai.use(chaiDom);
chai.use(chaiSpies);

import { setupServer } from "msw/node";
import mocks from "./src/shared/services/mocks";
const server = setupServer(...mocks);
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

beforeAll(() => {
  const error = console.error.bind(console);
  jest.spyOn(console, "error").mockImplementation((...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].startsWith(
        "Warning: An update to %s inside a test was not wrapped in act(...).",
      )
    ) {
      return;
    }

    return error(...args);
  });
});

afterAll(() => {
  //@ts-ignore
  console.error.mockRestore();
});
