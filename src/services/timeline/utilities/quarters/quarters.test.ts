import {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  October,
  November,
  December,
  Q1,
  Q2,
  Q3,
  Q4,
} from "../../constants";

import {
  getStaffingQuarter,
  getStartOfQuarter,
  getNextQuarter,
  getEndOfQuarter,
  getEndOfNextQuarter,
} from "./quarters";

describe("quarters utilities", () => {
  it.each([
    [new Date(2021, February, 4), Q1],
    [new Date(2021, May, 4), Q2],
    [new Date(2021, August, 4), Q3],
    [new Date(2021, November, 4), Q4],
    [new Date(2021, April, 3), Q1],
    [new Date(2021, July, 3), Q2],
    [new Date(2021, October, 2), Q3],
    [new Date(2022, January, 2), Q4],
    [new Date(2025, March, 31), Q2],
    [new Date(2024, December, 31), Q1],
  ])("finds staffing quarter for %s to be %s", (date, quarter) => {
    expect(getStaffingQuarter(date)).toBe(quarter);
  });

  it.each([
    [new Date(2021, January, 15), new Date(2021, January, 4)],
    [new Date(2021, May, 15), new Date(2021, April, 5)],
    [new Date(2021, August, 15), new Date(2021, July, 5)],
    [new Date(2021, November, 15), new Date(2021, October, 4)],
    [new Date(2021, April, 3), new Date(2021, January, 4)],
    [new Date(2021, July, 3), new Date(2021, April, 5)],
    [new Date(2021, October, 2), new Date(2021, July, 5)],
    [new Date(2022, January, 2), new Date(2021, October, 4)],
    [new Date(2025, March, 31), new Date(2025, March, 31)],
    [new Date(2024, December, 31), new Date(2024, December, 30)],
  ])("finds start of quarter %s", (date, start) => {
    expect(getStartOfQuarter(date)).toEqual(start);
  });

  it.each([
    [new Date(2021, February, 4), new Date(2021, April, 5)],
    [new Date(2021, May, 4), new Date(2021, July, 5)],
    [new Date(2021, August, 4), new Date(2021, October, 4)],
    [new Date(2021, November, 4), new Date(2022, January, 3)],
  ])("finds next quarter for %s to be %s", (date, nextQuarter) => {
    expect(getNextQuarter(date)).toEqual(nextQuarter);
  });

  it.each([
    [new Date(2021, February, 4), new Date(2021, April, 5)],
    [new Date(2021, May, 4), new Date(2021, July, 5)],
    [new Date(2021, August, 4), new Date(2021, October, 4)],
    [new Date(2021, November, 4), new Date(2022, January, 3)],
    [new Date(2021, April, 3), new Date(2021, April, 5)],
    [new Date(2021, July, 3), new Date(2021, July, 5)],
    [new Date(2021, October, 2), new Date(2021, October, 4)],
    [new Date(2022, January, 2), new Date(2022, January, 3)],
    [new Date(2025, March, 31), new Date(2025, June, 30)],
    [new Date(2024, December, 31), new Date(2025, March, 31)],
  ])("finds end of quarter %s", (date, endOfQuarter) => {
    expect(getEndOfQuarter(date)).toEqual(new Date(endOfQuarter.getTime() - 1));
  });

  it.each([
    [new Date(2021, February, 4), new Date(2021, July, 5)],
    [new Date(2021, May, 4), new Date(2021, October, 4)],
    [new Date(2021, August, 4), new Date(2022, January, 3)],
    [new Date(2021, November, 4), new Date(2022, April, 4)],
  ])("finds end of next quarter %s", (date, endOfNextQuarter) => {
    expect(getEndOfNextQuarter(date)).toEqual(
      new Date(endOfNextQuarter.getTime() - 1),
    );
  });
});
