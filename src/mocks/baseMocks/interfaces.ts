export const DateString = {
  [Symbol.for("can.new")]: function (v: string): string {
    return v;
  },
  [Symbol.for("can.SetType")]: class {
    constructor(public value: string) {
      this.value = value;
    }
    valueOf(): number {
      return new Date(this.value).getTime();
    }

    [Symbol.for("can.serialize")](): string {
      return this.value;
    }
  },
};
