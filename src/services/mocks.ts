import { setupWorker } from "msw";

import api from "./api/mocks";

const worker = setupWorker(...api);

export default worker;
