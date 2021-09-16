import type { Employee } from "./interfaces";

import QueryLogic from "can-query-logic";

import { employees } from "./fixtures";
import { DateString } from "../baseMocks";
import { createStore, requestCreator } from "../baseMocks";

class DateStringSet {
  constructor(public value: string) {
    this.value = value;
  }
  // used to convert to a number
  valueOf(): number {
    return new Date(this.value).getTime();
  }

  [Symbol.for("can.serialize")]() {
    return this.value;
  }
}

const DateString = {
  [Symbol.for("can.new")]: function (v: string): string {
    return v;
  },
  [Symbol.for("can.SetType")]: DateStringSet,
};

const queryLogic = new QueryLogic<Employee>({
  identity: ["id"],
  keys: {
    id: "string",
    name: "string",
    startDate: DateString,
    endDate: DateString,
    // skills: {
    //   type: "list",
    //   values: {
    //     keys: {
    //       id: "string",
    //       name: "string",
    //     },
    //   },
    //   keys: {
    //     count: "number",
    //   },
    // },
  },
});

const { store, ...storeManager } = createStore(
  employees,
  queryLogic,
  "employees",
);

export default [...requestCreator("/employees", store)];

export const employeeStoreManager = {
  ...storeManager,
};
