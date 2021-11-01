export interface MockResponse<D = undefined, M = undefined, I = undefined> {
  data?: D;
  included?: I;
  metadata?: M;
  error?: string;
}

export interface JSONAPI<D, M> {
  data?: {
    data?: D,
    included?: M
  }
  error?: string
}

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
