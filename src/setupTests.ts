/* eslint-disable import/no-extraneous-dependencies */

import chai from "chai";
import chaiDom from "chai-dom";
import chaiSpies from "chai-spies";
chai.use(chaiDom);
chai.use(chaiSpies);

import "@testing-library/jest-dom";

import { setupServer } from "msw/node";
import mocks from "./services/mocks";
const server = setupServer(...mocks);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
