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
import { getCannonQuarter } from "./quarters";

describe.only("timeline utilities logic", () => {
  it.only.each([
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

  // it.skip.each([])("finds end of quarter %s", () => {});

  // it.skip.each([])("finds end of next quarter %s", () => {});
});
