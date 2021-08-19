/* eslint-disable import/no-extraneous-dependencies */

import chai from "chai";
import chaiDom from "chai-dom";
chai.use(chaiDom);

import { setupServer } from "msw/node";
import mocks from "./services/mocks";
const server = setupServer(...mocks);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
