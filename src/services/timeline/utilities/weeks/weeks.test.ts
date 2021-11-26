import {
  getNumberOfStaffingWeeksInMonth,
  getStaffingWeekNumber,
  getStartOfWeek,
} from ".";

import {
  February,
  March,
  April,
  May,
  November,
  December,
} from "../../constants";

describe("week utilities", () => {
  it.each([
    [new Date(2021, February, 18), new Date(2021, February, 15)],
    [new Date(2021, March, 15), new Date(2021, March, 15)],
    [new Date(2021, April, 6), new Date(2021, April, 5)],
    [new Date(2021, May, 16), new Date(2021, May, 10)],
  ])("finds the start of a week for %s", (date, startOfWeek) => {
    expect(getStartOfWeek(date)).toEqual(startOfWeek);
  });

  it.each([
    [new Date(2021, November, 12), 4],
    [new Date(2021, December, 13), 5],
  ])(
    "finds the number of weeks in the month containing %s to be %s",
    (date, numberOfWeeks) => {
      expect(getNumberOfStaffingWeeksInMonth(date)).toBe(numberOfWeeks);
    },
  );

  it.each([
    [new Date(2021, November, 12), 2],
    [new Date(2021, December, 13), 3],
  ])("checks week number for %s", (date, weekNumber) => {
    expect(getStaffingWeekNumber(date)).toBe(weekNumber);
  });

  it.todo("adds week");
  it.todo("checks beginning of week");
  it.todo("checks end of week");
});
