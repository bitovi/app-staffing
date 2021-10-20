/* eslint-disable import/no-extraneous-dependencies */

import "@testing-library/jest-dom";

import chai from "chai";
import chaiDom from "chai-dom";
import chaiSpies from "chai-spies";

chai.use(chaiDom);
chai.use(chaiSpies);

import { setupServer } from "msw/node";
import mocks from "@staffing/services/mocks";

const server = setupServer(...mocks);
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
