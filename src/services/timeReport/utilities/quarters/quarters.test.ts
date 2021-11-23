import {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
  Q1,
  Q2,
  Q3,
  Q4,
} from "../../fixtures";

import { getCannonQuarter, getStartOfQuarter } from "./quarters";

describe("timeline utilities logic", () => {
  it.each([
    [new Date(2021, February, 4), Q1],
    [new Date(2021, May, 4), Q2],
    [new Date(2021, August, 4), Q3],
    [new Date(2021, November, 4), Q4], //
    [new Date(2021, April, 3), Q1],
    [new Date(2021, July, 3), Q2],
    [new Date(2021, October, 2), Q3],
    [new Date(2022, January, 2), Q4], //
    [new Date(2025, March, 31), Q2],
    [new Date(2024, December, 31), Q1],
  ])("finds cannon quarter for %s to be %s", (date, quarter) => {
    expect(getCannonQuarter(date)).toBe(quarter);
  });

  it.only.each([
    [new Date(2021, January, 15), new Date(2021, January, 4)],
    [new Date(2021, May, 15), new Date(2021, April, 5)],
    [new Date(2021, August, 15), new Date(2021, July, 5)],
    [new Date(2021, November, 15), new Date(2021, October, 4)],
    [new Date(2021, April, 3), new Date(2021, January, 4)],
    [new Date(2021, July, 3), new Date(2021, April, 5)],
    [new Date(2021, October, 2), new Date(2021, July, 5)],
    [new Date(2022, January, 2), new Date(2021, October, 4)], //
    [new Date(2025, March, 31), new Date(2025, March, 31)],
    [new Date(2024, December, 31), new Date(2024, December, 30)],
  ])("finds start of quarter %s", (date, start) => {
    expect(getStartOfQuarter(date)).toEqual(start);
  });

  // it.skip.each([])("finds end of quarter %s", () => {});

  // it.skip.each([])("finds end of next quarter %s", () => {});
});
