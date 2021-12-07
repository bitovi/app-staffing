import {
  EmployeeAttributes,
  EmployeeRelationships,
} from "../employees/interfaces";
import { SkillAttributes } from "../skills/interfaces";

export interface MockResponse<D = undefined, M = undefined, I = undefined> {
  data?: D;
  included?: I;
  metadata?: M;
  error?: string;
}

export interface JSONAPI<D, M = undefined> {
  data: D;
  included?: M;
  error?: string;
}

export interface JSONData<T, K = undefined, M = undefined> {
  type: T;
  id: string;
  attributes: K;
  relationships?: M;
}
type AllTypes = "roles" | "employees" | "skills" | "projects";
// expanded to include other endpoints as they conform to JSON API formatting
type AllAttributes = EmployeeAttributes | SkillAttributes;
type AllRelationships = EmployeeRelationships;

// Following two types utilized in the hydrateObject middleware within
// our fetcher function
export type AnyJsonObject = JSONData<AllTypes, AllAttributes, AllRelationships>;

export type AllJSONResults = JSONAPI<AnyJsonObject[]>;

class DateStringSet {
  constructor(public value: string) {
    this.value = value;
  }
  valueOf(): number {
    return new Date(this.value).getTime();
  }

  [Symbol.for("can.serialize")](): string {
    return this.value;
  }
}

export const DateString = {
  [Symbol.for("can.new")]: function (v: string): string {
    return v;
  },
  [Symbol.for("can.SetType")]: DateStringSet,
};
