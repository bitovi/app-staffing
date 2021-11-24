import { getStartOfWeek } from ".";

import { February, March, April, May } from "../../constants";

describe("week utilities", () => {
  it.each([
    [new Date(2021, February, 18), new Date(2021, February, 15)],
    [new Date(2021, March, 15), new Date(2021, March, 15)],
    [new Date(2021, April, 6), new Date(2021, April, 5)],
    [new Date(2021, May, 16), new Date(2021, May, 10)],
  ])("finds the start of a week for %s", (date, startOfWeek) => {
    expect(getStartOfWeek(date)).toEqual(startOfWeek);
  });

  it.todo("adds week");
  it.todo("checks beginning of week");
  it.todo("checks end of week");
});
